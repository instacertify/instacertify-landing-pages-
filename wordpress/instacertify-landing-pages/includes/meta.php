<?php

if (!defined('ABSPATH')) {
    exit;
}

add_action('add_meta_boxes', function () {
    add_meta_box(
        'iclp_landing_editor',
        __('Landing page content', 'instacertify-lp'),
        'iclp_render_meta_box',
        'ic_landing',
        'normal',
        'high'
    );
});

function iclp_render_meta_box($post)
{
    wp_nonce_field('iclp_save_meta', 'iclp_meta_nonce');
    $data = iclp_get_page_data($post->ID);
    $c = $data['content'];
    include ICLP_PATH . 'templates/admin-meta.php';
}

add_action('save_post_ic_landing', function ($post_id) {
    if (!isset($_POST['iclp_meta_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['iclp_meta_nonce'])), 'iclp_save_meta')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $fields = array(
        '_iclp_design' => 'sanitize_key',
        '_iclp_brand_name' => 'sanitize_text_field',
        '_iclp_headline' => 'sanitize_text_field',
        '_iclp_subheadline' => 'sanitize_textarea_field',
        '_iclp_cta_label' => 'sanitize_text_field',
        '_iclp_cta_url' => 'esc_url_raw',
        '_iclp_hero_image' => 'esc_url_raw',
        '_iclp_seo_title' => 'sanitize_text_field',
        '_iclp_seo_description' => 'sanitize_textarea_field',
        '_iclp_seo_keywords' => 'sanitize_text_field',
    );

    foreach ($fields as $key => $cb) {
        if (isset($_POST[$key])) {
            update_post_meta($post_id, $key, call_user_func($cb, wp_unslash($_POST[$key])));
        }
    }

    $sections = array();
    if (!empty($_POST['iclp_sections_json'])) {
        $decoded = json_decode(wp_unslash($_POST['iclp_sections_json']), true);
        if (is_array($decoded)) {
            foreach ($decoded as $section) {
                $sections[] = array(
                    'heading' => sanitize_text_field($section['heading'] ?? ''),
                    'text' => sanitize_textarea_field($section['text'] ?? ''),
                );
            }
        }
    }
    update_post_meta($post_id, '_iclp_sections', $sections);

    $content = array();
    if (!empty($_POST['iclp_content_json'])) {
        $content = iclp_sanitize_content($_POST['iclp_content_json']);
    } else {
        $content = iclp_default_content();
    }

    // Convenience fields from classic inputs override JSON when present
    $line_fields = array(
        'trustPoints' => 'iclp_trust_points',
        'serviceOptions' => 'iclp_service_options',
        'formTrustPoints' => 'iclp_form_trust_points',
    );
    foreach ($line_fields as $content_key => $post_key) {
        if (isset($_POST[$post_key])) {
            $content[$content_key] = iclp_lines_to_array(wp_unslash($_POST[$post_key]));
        }
    }

    $simple = array(
        'offerBanner', 'badgeText', 'ratingText', 'phone', 'whatsapp', 'formTitle',
        'formSubtitle', 'formSubmitLabel', 'bottomCtaText', 'bottomCtaSubtitle',
        'reviewsTitle', 'reviewsIntro', 'galleryTitle', 'themeBrand', 'themeAccent',
    );
    foreach ($simple as $key) {
        $post_key = 'iclp_' . $key;
        if (isset($_POST[$post_key])) {
            $content[$key] = sanitize_text_field(wp_unslash($_POST[$post_key]));
        }
    }
    if (isset($_POST['iclp_formEnabled'])) {
        $content['formEnabled'] = !empty($_POST['iclp_formEnabled']);
    }

    update_post_meta($post_id, '_iclp_content', $content);
});

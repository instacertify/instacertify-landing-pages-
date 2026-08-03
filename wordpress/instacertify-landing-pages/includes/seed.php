<?php

if (!defined('ABSPATH')) {
    exit;
}

function iclp_maybe_seed_sds_page()
{
    $existing = get_posts(array(
        'name' => 'sds-certificate',
        'post_type' => 'ic_landing',
        'post_status' => 'any',
        'numberposts' => 1,
    ));
    if ($existing) {
        iclp_ensure_public_page_shortcode();
        return;
    }

    $file = ICLP_PATH . 'seed/sds-certificate.json';
    if (!file_exists($file)) {
        return;
    }

    $raw = json_decode((string) file_get_contents($file), true);
    if (!is_array($raw)) {
        return;
    }

    $post_id = wp_insert_post(array(
        'post_type' => 'ic_landing',
        'post_status' => 'publish',
        'post_title' => $raw['title'] ?? 'SDS / MSDS Certificate & UN38.3 for Battery Shipping',
        'post_name' => $raw['slug'] ?? 'sds-certificate',
    ), true);

    if (is_wp_error($post_id)) {
        return;
    }

    $content = is_array($raw['content'] ?? null) ? $raw['content'] : array();
    $content['logoLightUrl'] = ICLP_URL . 'assets/instacertify-logo-light.svg';
    $content['logoDarkUrl'] = ICLP_URL . 'assets/instacertify-logo.svg';

    update_post_meta($post_id, '_iclp_design', $raw['design'] ?? 'battery');
    update_post_meta($post_id, '_iclp_brand_name', $raw['brandName'] ?? 'Instacertify');
    update_post_meta($post_id, '_iclp_headline', $raw['headline'] ?? '');
    update_post_meta($post_id, '_iclp_subheadline', $raw['subheadline'] ?? '');
    update_post_meta($post_id, '_iclp_cta_label', $raw['ctaLabel'] ?? 'Get Free Consultation');
    update_post_meta($post_id, '_iclp_cta_url', $raw['ctaUrl'] ?? home_url('/'));
    update_post_meta($post_id, '_iclp_hero_image', $raw['heroImage'] ?? '');
    update_post_meta($post_id, '_iclp_sections', $raw['sections'] ?? array());
    update_post_meta($post_id, '_iclp_content', iclp_sanitize_content($content));
    update_post_meta($post_id, '_iclp_seo_title', $raw['seo']['title'] ?? '');
    update_post_meta($post_id, '_iclp_seo_description', $raw['seo']['description'] ?? '');
    update_post_meta($post_id, '_iclp_seo_keywords', $raw['seo']['keywords'] ?? '');

    update_option('iclp_legal_name', 'Instacertify Labs Private Limited');
    update_option('iclp_support_email', 'contact@instacertify.com');
    update_option('iclp_support_phone', '+91 99999118039');
    update_option('iclp_support_whatsapp', '9199999118039');

    iclp_ensure_public_page_shortcode();
}

function iclp_ensure_public_page_shortcode()
{
    $page = get_page_by_path('sds-certificate');
    if ($page) {
        return;
    }

    wp_insert_post(array(
        'post_type' => 'page',
        'post_status' => 'publish',
        'post_title' => 'SDS Certificate',
        'post_name' => 'sds-certificate',
        'post_content' => '[iclp_landing slug="sds-certificate"]',
    ));
}

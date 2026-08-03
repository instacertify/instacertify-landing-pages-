<?php

if (!defined('ABSPATH')) {
    exit;
}

add_filter('template_include', function ($template) {
    if (is_singular('ic_landing')) {
        $custom = ICLP_PATH . 'templates/single-landing.php';
        if (file_exists($custom)) {
            return $custom;
        }
    }
    return $template;
});

add_shortcode('iclp_landing', function ($atts) {
    $atts = shortcode_atts(array(
        'id' => 0,
        'slug' => '',
    ), $atts, 'iclp_landing');

    $post = null;
    if (!empty($atts['id'])) {
        $post = get_post(absint($atts['id']));
    } elseif (!empty($atts['slug'])) {
        $posts = get_posts(array(
            'name' => sanitize_title($atts['slug']),
            'post_type' => 'ic_landing',
            'post_status' => 'publish',
            'numberposts' => 1,
        ));
        $post = $posts[0] ?? null;
    }

    if (!$post || $post->post_type !== 'ic_landing') {
        return '<p>' . esc_html__('Landing page not found.', 'instacertify-lp') . '</p>';
    }

    $page = iclp_get_page_data($post->ID);
    ob_start();
    iclp_render_landing($page, false);
    return ob_get_clean();
});

add_action('wp_enqueue_scripts', function () {
    if (!is_singular('ic_landing') && !iclp_page_has_shortcode()) {
        return;
    }
    wp_enqueue_style('iclp-fonts', 'https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=IBM+Plex+Sans:wght@400;600;700&display=swap', array(), null);
    wp_enqueue_style('iclp-front', ICLP_URL . 'assets/front.css', array('iclp-fonts'), ICLP_VERSION);
    wp_enqueue_script('iclp-front', ICLP_URL . 'assets/front.js', array(), ICLP_VERSION, true);
    wp_localize_script('iclp-front', 'ICLP', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('iclp_lead'),
    ));
});

add_action('wp_head', function () {
    if (!is_singular('ic_landing')) {
        return;
    }
    $page = iclp_get_page_data(get_the_ID());
    if (!$page) {
        return;
    }
    $title = $page['seo']['title'] ?: $page['title'];
    $desc = $page['seo']['description'] ?: $page['subheadline'];
    if ($title) {
        echo '<meta property="og:title" content="' . esc_attr($title) . '" />' . "\n";
    }
    if ($desc) {
        echo '<meta name="description" content="' . esc_attr($desc) . '" />' . "\n";
        echo '<meta property="og:description" content="' . esc_attr($desc) . '" />' . "\n";
    }
    if (!empty($page['seo']['keywords'])) {
        echo '<meta name="keywords" content="' . esc_attr($page['seo']['keywords']) . '" />' . "\n";
    }
    if (!empty($page['heroImage'])) {
        echo '<meta property="og:image" content="' . esc_url($page['heroImage']) . '" />' . "\n";
    }
}, 1);

function iclp_page_has_shortcode()
{
    if (!is_singular()) {
        return false;
    }
    $post = get_post();
    return $post && has_shortcode($post->post_content, 'iclp_landing');
}

function iclp_render_landing(array $page, $is_singular = true)
{
    $design = in_array($page['design'], array('battery', 'service'), true) ? $page['design'] : 'battery';
    $template = ICLP_PATH . 'templates/designs/' . $design . '.php';
    if (!file_exists($template)) {
        $template = ICLP_PATH . 'templates/designs/battery.php';
    }
    $c = $page['content'];
    $company = iclp_company_defaults();
    include $template;
}

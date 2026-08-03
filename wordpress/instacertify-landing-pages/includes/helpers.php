<?php

if (!defined('ABSPATH')) {
    exit;
}

function iclp_default_content()
{
    return array(
        'offerBanner' => '',
        'badgeText' => 'Includes free support',
        'ratingText' => '',
        'headlineHighlight' => '',
        'expertName' => 'Talk to Instacertify',
        'expertNote' => 'We are available 24/7.',
        'phone' => '+91 99999118039',
        'whatsapp' => '9199999118039',
        'themeBrand' => '#00557A',
        'themeAccent' => '#F27121',
        'themeInk' => '#0e1620',
        'themeBg' => '#f3f6f8',
        'brandPrefix' => 'Insta',
        'brandSuffix' => 'certify',
        'logoLightUrl' => '',
        'logoDarkUrl' => '',
        'sideRailTitle' => 'Why wait? Start now!',
        'sideRailText' => 'Get free guidance on the right service, documents, and timeline.',
        'sideHelpTitle' => 'Need help?',
        'sideHelpText' => 'Talk to an expert for document checklist and filing support.',
        'bottomCtaText' => 'Talk to an expert',
        'bottomCtaSubtitle' => 'Get free guidance on the right pathway, documents, and timeline.',
        'faqsIntro' => 'Quick answers to common questions about this service.',
        'footerBlurb' => '',
        'galleryTitle' => 'Gallery',
        'reviewsTitle' => 'Customer reviews',
        'reviewsIntro' => '',
        'pillarsTitle' => 'Complete solution pillars',
        'trustPoints' => array(),
        'heroStats' => array(),
        'formEnabled' => true,
        'formTitle' => 'Enquiry Now',
        'formSubtitle' => '',
        'formSubmitLabel' => 'Get Free Consultation',
        'formSuccessMessage' => 'Thanks! Our team will contact you shortly.',
        'formTrustPoints' => array(),
        'serviceOptions' => array(),
        'scrollCtaText' => '',
        'processTitle' => 'How we work',
        'process' => array(),
        'typesTitle' => '',
        'types' => array(),
        'timelinesTitle' => '',
        'timelines' => array(),
        'productsTitle' => '',
        'products' => array(),
        'documentsTitle' => '',
        'documents' => array(),
        'detailProcessTitle' => '',
        'detailProcess' => array(),
        'benefitsTitle' => '',
        'benefits' => array(),
        'penaltiesTitle' => '',
        'penalties' => array(),
        'whyTitle' => 'Why choose us?',
        'whyUs' => array(),
        'faqsTitle' => 'Frequently Asked Questions',
        'faqs' => array(),
        'reviewPool' => array(),
        'gallery' => array(),
    );
}

function iclp_get_page_data($post_id)
{
    $post = get_post($post_id);
    if (!$post || $post->post_type !== 'ic_landing') {
        return null;
    }

    $content = get_post_meta($post_id, '_iclp_content', true);
    if (!is_array($content)) {
        $content = array();
    }
    $content = array_merge(iclp_default_content(), $content);

    $sections = get_post_meta($post_id, '_iclp_sections', true);
    if (!is_array($sections)) {
        $sections = array();
    }

    return array(
        'id' => $post_id,
        'slug' => $post->post_name,
        'title' => get_the_title($post),
        'design' => get_post_meta($post_id, '_iclp_design', true) ?: 'battery',
        'brandName' => get_post_meta($post_id, '_iclp_brand_name', true) ?: 'Instacertify',
        'headline' => get_post_meta($post_id, '_iclp_headline', true) ?: get_the_title($post),
        'subheadline' => get_post_meta($post_id, '_iclp_subheadline', true) ?: '',
        'ctaLabel' => get_post_meta($post_id, '_iclp_cta_label', true) ?: 'Get Free Consultation',
        'ctaUrl' => get_post_meta($post_id, '_iclp_cta_url', true) ?: home_url('/'),
        'heroImage' => get_post_meta($post_id, '_iclp_hero_image', true) ?: '',
        'sections' => $sections,
        'content' => $content,
        'seo' => array(
            'title' => get_post_meta($post_id, '_iclp_seo_title', true) ?: '',
            'description' => get_post_meta($post_id, '_iclp_seo_description', true) ?: '',
            'keywords' => get_post_meta($post_id, '_iclp_seo_keywords', true) ?: '',
        ),
    );
}

function iclp_lines_to_array($text)
{
    $lines = preg_split("/\r\n|\n|\r/", (string) $text);
    $out = array();
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line !== '') {
            $out[] = $line;
        }
    }
    return $out;
}

function iclp_array_to_lines($arr)
{
    if (!is_array($arr)) {
        return '';
    }
    return implode("\n", array_map('strval', $arr));
}

function iclp_sanitize_content($raw)
{
    if (is_string($raw)) {
        $decoded = json_decode(wp_unslash($raw), true);
        $raw = is_array($decoded) ? $decoded : array();
    }
    if (!is_array($raw)) {
        $raw = array();
    }

    $content = array_merge(iclp_default_content(), $raw);
    $content['formEnabled'] = !empty($content['formEnabled']);
    $content['trustPoints'] = array_values(array_filter(array_map('sanitize_text_field', (array) $content['trustPoints'])));
    $content['formTrustPoints'] = array_values(array_filter(array_map('sanitize_text_field', (array) $content['formTrustPoints'])));
    $content['serviceOptions'] = array_values(array_filter(array_map('sanitize_text_field', (array) $content['serviceOptions'])));

    foreach (array('heroStats', 'whyUs') as $key) {
        $items = array();
        foreach ((array) $content[$key] as $item) {
            $items[] = array(
                'value' => sanitize_text_field($item['value'] ?? ''),
                'label' => sanitize_text_field($item['label'] ?? ''),
            );
        }
        $content[$key] = $items;
    }

    foreach (array('process', 'detailProcess', 'benefits', 'penalties') as $key) {
        $items = array();
        foreach ((array) $content[$key] as $item) {
            $items[] = array(
                'title' => sanitize_text_field($item['title'] ?? ''),
                'text' => sanitize_textarea_field($item['text'] ?? ''),
            );
        }
        $content[$key] = $items;
    }

    foreach (array('types', 'products') as $key) {
        $items = array();
        foreach ((array) $content[$key] as $item) {
            $items[] = array(
                'title' => sanitize_text_field($item['title'] ?? ''),
                'text' => sanitize_textarea_field($item['text'] ?? ''),
                'items' => array_values(array_filter(array_map('sanitize_text_field', (array) ($item['items'] ?? array())))),
            );
        }
        $content[$key] = $items;
    }

    $timelines = array();
    foreach ((array) $content['timelines'] as $item) {
        $timelines[] = array(
            'title' => sanitize_text_field($item['title'] ?? ''),
            'value' => sanitize_text_field($item['value'] ?? ''),
            'text' => sanitize_textarea_field($item['text'] ?? ''),
        );
    }
    $content['timelines'] = $timelines;

    $documents = array();
    foreach ((array) $content['documents'] as $item) {
        $documents[] = array(
            'title' => sanitize_text_field($item['title'] ?? ''),
            'items' => array_values(array_filter(array_map('sanitize_text_field', (array) ($item['items'] ?? array())))),
        );
    }
    $content['documents'] = $documents;

    $faqs = array();
    foreach ((array) $content['faqs'] as $item) {
        $faqs[] = array(
            'q' => sanitize_text_field($item['q'] ?? $item['question'] ?? ''),
            'a' => sanitize_textarea_field($item['a'] ?? $item['answer'] ?? ''),
        );
    }
    $content['faqs'] = $faqs;

    $reviews = array();
    foreach ((array) $content['reviewPool'] as $item) {
        $reviews[] = array(
            'quote' => sanitize_textarea_field($item['quote'] ?? ''),
            'name' => sanitize_text_field($item['name'] ?? ''),
            'rating' => max(1, min(5, intval($item['rating'] ?? 5))),
            'image' => esc_url_raw($item['image'] ?? ''),
            'show' => !isset($item['show']) || !empty($item['show']),
        );
    }
    $content['reviewPool'] = $reviews;

    $gallery = array();
    foreach ((array) $content['gallery'] as $item) {
        if (is_string($item)) {
            $gallery[] = array('url' => esc_url_raw($item), 'alt' => '', 'show' => true);
            continue;
        }
        $gallery[] = array(
            'url' => esc_url_raw($item['url'] ?? ''),
            'alt' => sanitize_text_field($item['alt'] ?? ''),
            'show' => !isset($item['show']) || !empty($item['show']),
        );
    }
    $content['gallery'] = array_values(array_filter($gallery, function ($g) {
        return !empty($g['url']);
    }));

    $string_keys = array(
        'offerBanner', 'badgeText', 'ratingText', 'headlineHighlight', 'expertName', 'expertNote',
        'phone', 'whatsapp', 'themeBrand', 'themeAccent', 'themeInk', 'themeBg', 'brandPrefix',
        'brandSuffix', 'logoLightUrl', 'logoDarkUrl', 'sideRailTitle', 'sideRailText', 'sideHelpTitle',
        'sideHelpText', 'bottomCtaText', 'bottomCtaSubtitle', 'faqsIntro', 'footerBlurb', 'galleryTitle',
        'reviewsTitle', 'reviewsIntro', 'pillarsTitle', 'formTitle', 'formSubtitle', 'formSubmitLabel',
        'formSuccessMessage', 'scrollCtaText', 'processTitle', 'typesTitle', 'timelinesTitle',
        'productsTitle', 'documentsTitle', 'detailProcessTitle', 'benefitsTitle', 'penaltiesTitle',
        'whyTitle', 'faqsTitle',
    );
    foreach ($string_keys as $key) {
        if (strpos($key, 'Url') !== false || in_array($key, array('logoLightUrl', 'logoDarkUrl'), true)) {
            $content[$key] = esc_url_raw($content[$key] ?? '');
        } else {
            $content[$key] = sanitize_text_field($content[$key] ?? '');
        }
    }

    return $content;
}

function iclp_company_defaults()
{
    return array(
        'legal_name' => get_option('iclp_legal_name', 'Instacertify Labs Private Limited'),
        'support_email' => get_option('iclp_support_email', 'contact@instacertify.com'),
        'support_phone' => get_option('iclp_support_phone', '+91 99999118039'),
        'support_whatsapp' => get_option('iclp_support_whatsapp', '9199999118039'),
    );
}

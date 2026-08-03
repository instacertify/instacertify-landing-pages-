<?php

if (!defined('ABSPATH')) {
    exit;
}

function iclp_leads_table_name()
{
    global $wpdb;
    return $wpdb->prefix . 'iclp_leads';
}

function iclp_register_lead_table()
{
    global $wpdb;
    $table = iclp_leads_table_name();
    $charset = $wpdb->get_charset_collate();

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta("CREATE TABLE {$table} (
        id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        page_id bigint(20) unsigned NULL,
        page_slug varchar(191) NOT NULL DEFAULT '',
        name varchar(191) NOT NULL DEFAULT '',
        email varchar(191) NOT NULL DEFAULT '',
        phone varchar(64) NOT NULL DEFAULT '',
        city varchar(191) NOT NULL DEFAULT '',
        service varchar(191) NOT NULL DEFAULT '',
        message text NULL,
        utm_json longtext NULL,
        created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id),
        KEY page_slug (page_slug)
    ) {$charset};");
}

function iclp_get_leads($limit = 100)
{
    global $wpdb;
    $table = iclp_leads_table_name();
    // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
    return $wpdb->get_results($wpdb->prepare("SELECT * FROM {$table} ORDER BY created_at DESC LIMIT %d", $limit), ARRAY_A) ?: array();
}

add_action('wp_ajax_iclp_submit_lead', 'iclp_handle_lead_submit');
add_action('wp_ajax_nopriv_iclp_submit_lead', 'iclp_handle_lead_submit');

function iclp_handle_lead_submit()
{
    check_ajax_referer('iclp_lead', 'nonce');

    $name = sanitize_text_field(wp_unslash($_POST['name'] ?? ''));
    $phone = sanitize_text_field(wp_unslash($_POST['phone'] ?? ''));
    $email = sanitize_email(wp_unslash($_POST['email'] ?? ''));
    $city = sanitize_text_field(wp_unslash($_POST['city'] ?? ''));
    $service = sanitize_text_field(wp_unslash($_POST['service'] ?? ''));
    $message = sanitize_textarea_field(wp_unslash($_POST['message'] ?? ''));
    $page_slug = sanitize_title(wp_unslash($_POST['pageSlug'] ?? ''));
    $page_id = absint($_POST['pageId'] ?? 0);

    if ($name === '' || ($phone === '' && $email === '')) {
        wp_send_json_error(array('error' => 'Name and phone or email are required'), 400);
    }

    global $wpdb;
    $wpdb->insert(iclp_leads_table_name(), array(
        'page_id' => $page_id ?: null,
        'page_slug' => $page_slug,
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'city' => $city,
        'service' => $service,
        'message' => $message,
        'utm_json' => wp_json_encode(array(
            'utm_source' => sanitize_text_field(wp_unslash($_POST['utm_source'] ?? '')),
            'utm_medium' => sanitize_text_field(wp_unslash($_POST['utm_medium'] ?? '')),
            'utm_campaign' => sanitize_text_field(wp_unslash($_POST['utm_campaign'] ?? '')),
            'gclid' => sanitize_text_field(wp_unslash($_POST['gclid'] ?? '')),
        )),
        'created_at' => current_time('mysql'),
    ));

    $to = iclp_company_defaults()['support_email'];
    if (is_email($to)) {
        wp_mail(
            $to,
            'New landing lead: ' . $name,
            "Name: {$name}\nPhone: {$phone}\nEmail: {$email}\nCity: {$city}\nService: {$service}\nPage: {$page_slug}\nMessage: {$message}"
        );
    }

    wp_send_json_success(array('ok' => true, 'id' => (int) $wpdb->insert_id));
}

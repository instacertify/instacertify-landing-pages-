<?php

if (!defined('ABSPATH')) {
    exit;
}

add_action('admin_menu', function () {
    add_submenu_page(
        'edit.php?post_type=ic_landing',
        __('Leads', 'instacertify-lp'),
        __('Leads', 'instacertify-lp'),
        'edit_posts',
        'iclp-leads',
        'iclp_render_leads_page'
    );

    add_submenu_page(
        'edit.php?post_type=ic_landing',
        __('Settings', 'instacertify-lp'),
        __('Settings', 'instacertify-lp'),
        'manage_options',
        'iclp-settings',
        'iclp_render_settings_page'
    );
});

add_action('admin_enqueue_scripts', function ($hook) {
    global $post_type;
    if ($post_type !== 'ic_landing' && strpos((string) $hook, 'iclp-') === false) {
        return;
    }

    wp_enqueue_media();
    wp_enqueue_style('iclp-admin', ICLP_URL . 'assets/admin.css', array(), ICLP_VERSION);
    wp_enqueue_script('iclp-admin', ICLP_URL . 'assets/admin.js', array('jquery'), ICLP_VERSION, true);
});

function iclp_render_settings_page()
{
    if (!current_user_can('manage_options')) {
        return;
    }

    if (isset($_POST['iclp_settings_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['iclp_settings_nonce'])), 'iclp_save_settings')) {
        update_option('iclp_legal_name', sanitize_text_field(wp_unslash($_POST['iclp_legal_name'] ?? '')));
        update_option('iclp_support_email', sanitize_email(wp_unslash($_POST['iclp_support_email'] ?? '')));
        update_option('iclp_support_phone', sanitize_text_field(wp_unslash($_POST['iclp_support_phone'] ?? '')));
        update_option('iclp_support_whatsapp', sanitize_text_field(wp_unslash($_POST['iclp_support_whatsapp'] ?? '')));
        echo '<div class="updated"><p>' . esc_html__('Settings saved.', 'instacertify-lp') . '</p></div>';
    }

    $defaults = iclp_company_defaults();
    ?>
    <div class="wrap">
      <h1><?php esc_html_e('Instacertify Landing Settings', 'instacertify-lp'); ?></h1>
      <form method="post">
        <?php wp_nonce_field('iclp_save_settings', 'iclp_settings_nonce'); ?>
        <table class="form-table">
          <tr>
            <th><label for="iclp_legal_name"><?php esc_html_e('Legal company name', 'instacertify-lp'); ?></label></th>
            <td><input class="regular-text" id="iclp_legal_name" name="iclp_legal_name" value="<?php echo esc_attr($defaults['legal_name']); ?>" /></td>
          </tr>
          <tr>
            <th><label for="iclp_support_email"><?php esc_html_e('Support email', 'instacertify-lp'); ?></label></th>
            <td><input class="regular-text" id="iclp_support_email" name="iclp_support_email" value="<?php echo esc_attr($defaults['support_email']); ?>" /></td>
          </tr>
          <tr>
            <th><label for="iclp_support_phone"><?php esc_html_e('Support phone', 'instacertify-lp'); ?></label></th>
            <td><input class="regular-text" id="iclp_support_phone" name="iclp_support_phone" value="<?php echo esc_attr($defaults['support_phone']); ?>" /></td>
          </tr>
          <tr>
            <th><label for="iclp_support_whatsapp"><?php esc_html_e('WhatsApp number', 'instacertify-lp'); ?></label></th>
            <td><input class="regular-text" id="iclp_support_whatsapp" name="iclp_support_whatsapp" value="<?php echo esc_attr($defaults['support_whatsapp']); ?>" /></td>
          </tr>
        </table>
        <?php submit_button(); ?>
      </form>
      <hr />
      <h2><?php esc_html_e('Publish tip for Ads URLs', 'instacertify-lp'); ?></h2>
      <p><?php esc_html_e('Create a normal WordPress Page with slug sds-certificate and paste:', 'instacertify-lp'); ?></p>
      <code>[iclp_landing slug="sds-certificate"]</code>
    </div>
    <?php
}

function iclp_render_leads_page()
{
    if (!current_user_can('edit_posts')) {
        return;
    }
    $leads = iclp_get_leads(200);
    ?>
    <div class="wrap">
      <h1><?php esc_html_e('Landing page leads', 'instacertify-lp'); ?></h1>
      <table class="widefat striped">
        <thead>
          <tr>
            <th><?php esc_html_e('Date', 'instacertify-lp'); ?></th>
            <th><?php esc_html_e('Name', 'instacertify-lp'); ?></th>
            <th><?php esc_html_e('Phone', 'instacertify-lp'); ?></th>
            <th><?php esc_html_e('Email', 'instacertify-lp'); ?></th>
            <th><?php esc_html_e('Service', 'instacertify-lp'); ?></th>
            <th><?php esc_html_e('Page', 'instacertify-lp'); ?></th>
            <th><?php esc_html_e('Message', 'instacertify-lp'); ?></th>
          </tr>
        </thead>
        <tbody>
          <?php if (!$leads) : ?>
            <tr><td colspan="7"><?php esc_html_e('No leads yet.', 'instacertify-lp'); ?></td></tr>
          <?php endif; ?>
          <?php foreach ($leads as $lead) : ?>
            <tr>
              <td><?php echo esc_html($lead['created_at']); ?></td>
              <td><?php echo esc_html($lead['name']); ?></td>
              <td><?php echo esc_html($lead['phone']); ?></td>
              <td><?php echo esc_html($lead['email']); ?></td>
              <td><?php echo esc_html($lead['service']); ?></td>
              <td><?php echo esc_html($lead['page_slug']); ?></td>
              <td><?php echo esc_html($lead['message']); ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
    <?php
}

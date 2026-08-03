<?php
/**
 * Plugin Name: Instacertify Landing Pages
 * Description: CMS-style landing pages for Instacertify (SDS / MSDS / UN38.3 and more) with unique designs, review pool, gallery, and lead forms. Hostinger WordPress ready.
 * Version: 1.0.0
 * Author: Instacertify Labs Private Limited
 * Text Domain: instacertify-lp
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

if (!defined('ABSPATH')) {
    exit;
}

define('ICLP_VERSION', '1.0.0');
define('ICLP_FILE', __FILE__);
define('ICLP_PATH', plugin_dir_path(__FILE__));
define('ICLP_URL', plugin_dir_url(__FILE__));

require_once ICLP_PATH . 'includes/helpers.php';
require_once ICLP_PATH . 'includes/post-type.php';
require_once ICLP_PATH . 'includes/meta.php';
require_once ICLP_PATH . 'includes/admin.php';
require_once ICLP_PATH . 'includes/leads.php';
require_once ICLP_PATH . 'includes/frontend.php';
require_once ICLP_PATH . 'includes/seed.php';

register_activation_hook(__FILE__, 'iclp_activate');
register_deactivation_hook(__FILE__, 'iclp_deactivate');

function iclp_activate()
{
    iclp_register_post_types();
    iclp_register_lead_table();
    flush_rewrite_rules();
    iclp_maybe_seed_sds_page();
}

function iclp_deactivate()
{
    flush_rewrite_rules();
}

add_action('plugins_loaded', function () {
    load_plugin_textdomain('instacertify-lp', false, dirname(plugin_basename(__FILE__)) . '/languages');
});

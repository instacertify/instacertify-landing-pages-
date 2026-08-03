<?php
if (!defined('ABSPATH')) {
    exit;
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title><?php
    $page = iclp_get_page_data(get_the_ID());
    echo esc_html(($page['seo']['title'] ?? '') ?: get_the_title());
  ?></title>
  <?php wp_head(); ?>
</head>
<body <?php body_class('iclp-body'); ?>>
<?php
while (have_posts()) {
    the_post();
    $page = iclp_get_page_data(get_the_ID());
    if ($page) {
        iclp_render_landing($page, true);
    }
}
wp_footer();
?>
</body>
</html>

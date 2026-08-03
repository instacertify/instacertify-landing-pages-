<?php
if (!defined('ABSPATH')) {
    exit;
}
/** @var array $data */
/** @var array $c */
?>
<div class="iclp-admin">
  <p class="description">
    <?php esc_html_e('Same shared content model as the Node CMS. Use unique design per campaign. Shortcode:', 'instacertify-lp'); ?>
    <code>[iclp_landing id="<?php echo esc_attr((string) $data['id']); ?>"]</code>
    <?php esc_html_e('or', 'instacertify-lp'); ?>
    <code>[iclp_landing slug="<?php echo esc_attr($data['slug']); ?>"]</code>
  </p>

  <div class="iclp-grid">
    <p>
      <label><strong><?php esc_html_e('Design', 'instacertify-lp'); ?></strong></label><br />
      <select name="_iclp_design">
        <option value="battery" <?php selected($data['design'], 'battery'); ?>>Battery / SDS shipping (unique)</option>
        <option value="service" <?php selected($data['design'], 'service'); ?>>Service (compliance)</option>
      </select>
    </p>
    <p>
      <label><strong><?php esc_html_e('Brand name', 'instacertify-lp'); ?></strong></label><br />
      <input type="text" class="widefat" name="_iclp_brand_name" value="<?php echo esc_attr($data['brandName']); ?>" />
    </p>
    <p>
      <label><strong><?php esc_html_e('Headline', 'instacertify-lp'); ?></strong></label><br />
      <input type="text" class="widefat" name="_iclp_headline" value="<?php echo esc_attr($data['headline']); ?>" />
    </p>
    <p>
      <label><strong><?php esc_html_e('CTA label', 'instacertify-lp'); ?></strong></label><br />
      <input type="text" class="widefat" name="_iclp_cta_label" value="<?php echo esc_attr($data['ctaLabel']); ?>" />
    </p>
  </div>

  <p>
    <label><strong><?php esc_html_e('Supporting sentence', 'instacertify-lp'); ?></strong></label><br />
    <textarea class="widefat" rows="3" name="_iclp_subheadline"><?php echo esc_textarea($data['subheadline']); ?></textarea>
  </p>

  <div class="iclp-grid">
    <p>
      <label><strong><?php esc_html_e('Hero image URL', 'instacertify-lp'); ?></strong></label><br />
      <input type="url" class="widefat iclp-image-url" name="_iclp_hero_image" id="iclp_hero_image" value="<?php echo esc_url($data['heroImage']); ?>" />
      <button type="button" class="button iclp-media-btn" data-target="iclp_hero_image"><?php esc_html_e('Add / Replace image', 'instacertify-lp'); ?></button>
    </p>
    <p>
      <label><strong><?php esc_html_e('CTA URL', 'instacertify-lp'); ?></strong></label><br />
      <input type="url" class="widefat" name="_iclp_cta_url" value="<?php echo esc_url($data['ctaUrl']); ?>" />
    </p>
    <p>
      <label><strong><?php esc_html_e('Offer banner', 'instacertify-lp'); ?></strong></label><br />
      <input type="text" class="widefat" name="iclp_offerBanner" value="<?php echo esc_attr($c['offerBanner']); ?>" />
    </p>
    <p>
      <label><strong><?php esc_html_e('Badge text', 'instacertify-lp'); ?></strong></label><br />
      <input type="text" class="widefat" name="iclp_badgeText" value="<?php echo esc_attr($c['badgeText']); ?>" />
    </p>
    <p>
      <label><strong><?php esc_html_e('Phone', 'instacertify-lp'); ?></strong></label><br />
      <input type="text" class="widefat" name="iclp_phone" value="<?php echo esc_attr($c['phone']); ?>" />
    </p>
    <p>
      <label><strong><?php esc_html_e('WhatsApp', 'instacertify-lp'); ?></strong></label><br />
      <input type="text" class="widefat" name="iclp_whatsapp" value="<?php echo esc_attr($c['whatsapp']); ?>" />
    </p>
    <p>
      <label><strong><?php esc_html_e('Theme brand', 'instacertify-lp'); ?></strong></label><br />
      <input type="text" class="widefat" name="iclp_themeBrand" value="<?php echo esc_attr($c['themeBrand']); ?>" />
    </p>
    <p>
      <label><strong><?php esc_html_e('Theme accent', 'instacertify-lp'); ?></strong></label><br />
      <input type="text" class="widefat" name="iclp_themeAccent" value="<?php echo esc_attr($c['themeAccent']); ?>" />
    </p>
  </div>

  <p>
    <label><strong><?php esc_html_e('Trust points (one per line)', 'instacertify-lp'); ?></strong></label><br />
    <textarea class="widefat" rows="4" name="iclp_trust_points"><?php echo esc_textarea(iclp_array_to_lines($c['trustPoints'])); ?></textarea>
  </p>
  <p>
    <label><strong><?php esc_html_e('Form service options (one per line)', 'instacertify-lp'); ?></strong></label><br />
    <textarea class="widefat" rows="4" name="iclp_service_options"><?php echo esc_textarea(iclp_array_to_lines($c['serviceOptions'])); ?></textarea>
  </p>

  <div class="iclp-grid">
    <p>
      <label><strong><?php esc_html_e('Form title', 'instacertify-lp'); ?></strong></label><br />
      <input type="text" class="widefat" name="iclp_formTitle" value="<?php echo esc_attr($c['formTitle']); ?>" />
    </p>
    <p>
      <label><strong><?php esc_html_e('Form submit label', 'instacertify-lp'); ?></strong></label><br />
      <input type="text" class="widefat" name="iclp_formSubmitLabel" value="<?php echo esc_attr($c['formSubmitLabel']); ?>" />
    </p>
    <p>
      <label><strong><?php esc_html_e('Reviews title', 'instacertify-lp'); ?></strong></label><br />
      <input type="text" class="widefat" name="iclp_reviewsTitle" value="<?php echo esc_attr($c['reviewsTitle']); ?>" />
    </p>
    <p>
      <label><strong><?php esc_html_e('Gallery title', 'instacertify-lp'); ?></strong></label><br />
      <input type="text" class="widefat" name="iclp_galleryTitle" value="<?php echo esc_attr($c['galleryTitle']); ?>" />
    </p>
  </div>
  <p>
    <label>
      <input type="checkbox" name="iclp_formEnabled" value="1" <?php checked(!empty($c['formEnabled'])); ?> />
      <?php esc_html_e('Enable lead form', 'instacertify-lp'); ?>
    </label>
  </p>

  <hr />
  <h3><?php esc_html_e('Sections JSON', 'instacertify-lp'); ?></h3>
  <p class="description"><?php esc_html_e('Array of {heading, text}.', 'instacertify-lp'); ?></p>
  <textarea class="widefat code" rows="8" name="iclp_sections_json"><?php echo esc_textarea(wp_json_encode($data['sections'], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)); ?></textarea>

  <h3><?php esc_html_e('Complete content JSON', 'instacertify-lp'); ?></h3>
  <p class="description"><?php esc_html_e('Full edit space: types, timelines, documents, FAQs, reviewPool, gallery, chrome, and more.', 'instacertify-lp'); ?></p>
  <textarea class="widefat code" rows="18" name="iclp_content_json" id="iclp_content_json"><?php echo esc_textarea(wp_json_encode($c, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)); ?></textarea>

  <p>
    <button type="button" class="button" id="iclp-add-gallery-image"><?php esc_html_e('Add gallery image from Media Library', 'instacertify-lp'); ?></button>
    <button type="button" class="button" id="iclp-add-review"><?php esc_html_e('Add review to pool', 'instacertify-lp'); ?></button>
  </p>

  <hr />
  <h3><?php esc_html_e('SEO', 'instacertify-lp'); ?></h3>
  <div class="iclp-grid">
    <p>
      <label><strong><?php esc_html_e('SEO title', 'instacertify-lp'); ?></strong></label><br />
      <input type="text" class="widefat" name="_iclp_seo_title" value="<?php echo esc_attr($data['seo']['title']); ?>" />
    </p>
    <p>
      <label><strong><?php esc_html_e('SEO keywords', 'instacertify-lp'); ?></strong></label><br />
      <input type="text" class="widefat" name="_iclp_seo_keywords" value="<?php echo esc_attr($data['seo']['keywords']); ?>" />
    </p>
  </div>
  <p>
    <label><strong><?php esc_html_e('SEO description', 'instacertify-lp'); ?></strong></label><br />
    <textarea class="widefat" rows="3" name="_iclp_seo_description"><?php echo esc_textarea($data['seo']['description']); ?></textarea>
  </p>
</div>

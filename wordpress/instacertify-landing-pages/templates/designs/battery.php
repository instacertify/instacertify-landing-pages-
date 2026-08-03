<?php
if (!defined('ABSPATH')) {
    exit;
}
/** @var array $page */
/** @var array $c */
/** @var array $company */

$phone = $c['phone'] ?: $company['support_phone'];
$whatsapp = $c['whatsapp'] ?: $company['support_whatsapp'];
$email = $company['support_email'];
$legal = $company['legal_name'];
$brand_prefix = $c['brandPrefix'] ?: 'Insta';
$brand_suffix = $c['brandSuffix'] ?: 'certify';
$logo_light = $c['logoLightUrl'] ?: '';
$reviews = array_values(array_filter((array) $c['reviewPool'], function ($item) {
    return !isset($item['show']) || !empty($item['show']);
}));
$gallery = array_values(array_filter((array) $c['gallery'], function ($item) {
    return !empty($item['url']) && (!isset($item['show']) || !empty($item['show']));
}));
$pillars = array_slice((array) $c['types'], 0, 3);
if (!$pillars) {
    $pillars = array_slice((array) $c['heroStats'], 0, 3);
}
$stats = !empty($c['heroStats']) ? $c['heroStats'] : $c['whyUs'];
$procedure = !empty($c['detailProcess']) ? $c['detailProcess'] : $c['process'];
$tel = preg_replace('/\s+/', '', $phone);
$wa = preg_replace('/\D+/', '', $whatsapp);
?>
<style>
  .iclp-wrap {
    --brand: <?php echo esc_attr($c['themeBrand'] ?: '#00557A'); ?>;
    --accent: <?php echo esc_attr($c['themeAccent'] ?: '#F27121'); ?>;
    --ink: <?php echo esc_attr($c['themeInk'] ?: '#0e1620'); ?>;
    --bg: <?php echo esc_attr($c['themeBg'] ?: '#f3f6f8'); ?>;
  }
</style>

<div class="iclp-wrap">
  <?php if (!empty($c['offerBanner'])) : ?>
    <div class="iclp-offer"><?php echo esc_html($c['offerBanner']); ?></div>
  <?php endif; ?>

  <div class="iclp-bar">
    <div class="iclp-bar-inner">
      <?php if ($logo_light) : ?>
        <img class="iclp-logo" src="<?php echo esc_url($logo_light); ?>" alt="<?php echo esc_attr($page['brandName']); ?>" />
      <?php else : ?>
        <strong class="iclp-wordmark"><span class="a"><?php echo esc_html($brand_prefix); ?></span><span class="b"><?php echo esc_html($brand_suffix); ?></span></strong>
      <?php endif; ?>
      <div class="iclp-bar-actions">
        <?php if ($phone) : ?><a class="iclp-btn soft" href="tel:<?php echo esc_attr($tel); ?>"><?php echo esc_html($phone); ?></a><?php endif; ?>
        <a class="iclp-btn accent" href="#iclp-lead-form"><?php echo esc_html($page['ctaLabel']); ?></a>
      </div>
    </div>
  </div>

  <header class="iclp-hero" <?php if (!empty($page['heroImage'])) : ?>style="--hero-image:url('<?php echo esc_url($page['heroImage']); ?>')"<?php endif; ?>>
    <div class="iclp-hero-copy">
      <?php if (!empty($c['badgeText'])) : ?><div class="iclp-badge"><?php echo esc_html($c['badgeText']); ?></div><?php endif; ?>
      <p class="iclp-wordmark large"><span class="a"><?php echo esc_html($brand_prefix); ?></span><span class="b"><?php echo esc_html($brand_suffix); ?></span></p>
      <h1><?php echo esc_html($page['headline']); ?></h1>
      <?php if (!empty($page['subheadline'])) : ?><p class="iclp-sub"><?php echo esc_html($page['subheadline']); ?></p><?php endif; ?>
      <?php if (!empty($c['ratingText'])) : ?><p class="iclp-sub">★ <?php echo esc_html($c['ratingText']); ?></p><?php endif; ?>
      <?php if (!empty($c['trustPoints'])) : ?>
        <ul class="iclp-trust">
          <?php foreach (array_slice($c['trustPoints'], 0, 4) as $point) : ?>
            <li><?php echo esc_html($point); ?></li>
          <?php endforeach; ?>
        </ul>
      <?php endif; ?>
    </div>

    <?php if (!empty($c['formEnabled'])) : ?>
    <aside class="iclp-form" id="iclp-lead-form">
      <h2><?php echo esc_html($c['formTitle'] ?: 'Enquiry Now'); ?></h2>
      <p class="iclp-hint"><?php echo esc_html($c['formSubtitle'] ?: $page['title']); ?></p>
      <form class="iclp-lead-form" data-success="<?php echo esc_attr($c['formSuccessMessage']); ?>">
        <input type="hidden" name="pageSlug" value="<?php echo esc_attr($page['slug']); ?>" />
        <input type="hidden" name="pageId" value="<?php echo esc_attr((string) $page['id']); ?>" />
        <label><span>Full name</span><input name="name" required autocomplete="name" /></label>
        <label><span>Mobile</span><input name="phone" required autocomplete="tel" /></label>
        <label><span>Email</span><input type="email" name="email" required autocomplete="email" /></label>
        <label><span>City</span><input name="city" autocomplete="address-level2" /></label>
        <?php if (!empty($c['serviceOptions'])) : ?>
          <label><span>Certification type</span>
            <select name="service" required>
              <option value="">Select Certification Type</option>
              <?php foreach ($c['serviceOptions'] as $option) : ?>
                <option value="<?php echo esc_attr($option); ?>"><?php echo esc_html($option); ?></option>
              <?php endforeach; ?>
            </select>
          </label>
        <?php else : ?>
          <input type="hidden" name="service" value="<?php echo esc_attr($page['title']); ?>" />
        <?php endif; ?>
        <label><span>Requirement</span><textarea name="message" rows="3"></textarea></label>
        <button class="iclp-btn accent" type="submit"><?php echo esc_html($c['formSubmitLabel'] ?: 'Get Free Consultation'); ?></button>
      </form>
      <?php if (!empty($c['formTrustPoints'])) : ?>
        <div class="iclp-form-trust">
          <?php foreach ($c['formTrustPoints'] as $point) : ?><span><?php echo esc_html($point); ?></span><?php endforeach; ?>
        </div>
      <?php endif; ?>
      <p class="iclp-form-success" hidden></p>
      <?php if (!empty($c['expertName']) || $phone) : ?>
        <div class="iclp-expert">
          <strong><?php echo esc_html($c['expertName'] ?: 'Talk to an expert'); ?></strong>
          <?php if ($phone) : ?><a href="tel:<?php echo esc_attr($tel); ?>"><?php echo esc_html($phone); ?></a><?php endif; ?>
          <span><?php echo esc_html($c['expertNote']); ?></span>
        </div>
      <?php endif; ?>
    </aside>
    <?php endif; ?>
  </header>

  <?php if ($pillars) : ?>
  <section class="iclp-pillars">
    <?php foreach ($pillars as $item) : ?>
      <article>
        <strong><?php echo esc_html($item['title'] ?? $item['value'] ?? ''); ?></strong>
        <span><?php echo esc_html($item['text'] ?? $item['label'] ?? ''); ?></span>
      </article>
    <?php endforeach; ?>
  </section>
  <?php endif; ?>

  <?php if ($stats) : ?>
  <section class="iclp-stats">
    <?php foreach (array_slice($stats, 0, 4) as $item) : ?>
      <div><strong><?php echo esc_html($item['value'] ?? ''); ?></strong><span><?php echo esc_html($item['label'] ?? ''); ?></span></div>
    <?php endforeach; ?>
  </section>
  <?php endif; ?>

  <div class="iclp-layout">
    <div class="iclp-main">
      <?php if (!empty($page['sections'])) : ?>
        <section class="iclp-block" id="overview">
          <?php foreach ($page['sections'] as $index => $section) : ?>
            <div class="<?php echo $index ? 'iclp-spaced' : ''; ?>">
              <?php if (!empty($section['heading'])) : ?>
                <?php if ($index === 0) : ?><h2><?php echo esc_html($section['heading']); ?></h2><?php else : ?><h3><?php echo esc_html($section['heading']); ?></h3><?php endif; ?>
              <?php endif; ?>
              <?php if (!empty($section['text'])) : ?><p><?php echo esc_html($section['text']); ?></p><?php endif; ?>
            </div>
          <?php endforeach; ?>
        </section>
      <?php endif; ?>

      <?php if (!empty($c['types'])) : ?>
        <section class="iclp-block" id="types">
          <h2><?php echo esc_html($c['typesTitle'] ?: 'Complete solution coverage'); ?></h2>
          <div class="iclp-grid-2">
            <?php foreach ($c['types'] as $type) : ?>
              <article class="iclp-card">
                <?php if (!empty($type['title'])) : ?><h3><?php echo esc_html($type['title']); ?></h3><?php endif; ?>
                <?php if (!empty($type['text'])) : ?><p><?php echo esc_html($type['text']); ?></p><?php endif; ?>
                <?php if (!empty($type['items'])) : ?>
                  <ul><?php foreach ($type['items'] as $line) : ?><li><?php echo esc_html($line); ?></li><?php endforeach; ?></ul>
                <?php endif; ?>
              </article>
            <?php endforeach; ?>
          </div>
        </section>
      <?php endif; ?>

      <?php if (!empty($c['timelines'])) : ?>
        <section class="iclp-block" id="timelines">
          <h2><?php echo esc_html($c['timelinesTitle'] ?: 'Typical timelines'); ?></h2>
          <div class="iclp-grid-2">
            <?php foreach ($c['timelines'] as $item) : ?>
              <article class="iclp-card">
                <?php if (!empty($item['title'])) : ?><h3><?php echo esc_html($item['title']); ?></h3><?php endif; ?>
                <?php if (!empty($item['value'])) : ?><p class="iclp-timeline"><?php echo esc_html($item['value']); ?></p><?php endif; ?>
                <?php if (!empty($item['text'])) : ?><p><?php echo esc_html($item['text']); ?></p><?php endif; ?>
              </article>
            <?php endforeach; ?>
          </div>
        </section>
      <?php endif; ?>

      <?php if (!empty($c['documents'])) : ?>
        <section class="iclp-block" id="documents">
          <h2><?php echo esc_html($c['documentsTitle'] ?: 'Documents'); ?></h2>
          <div class="iclp-grid-2">
            <?php foreach ($c['documents'] as $group) : ?>
              <article class="iclp-card">
                <h3><?php echo esc_html($group['title'] ?? ''); ?></h3>
                <ul><?php foreach ((array) ($group['items'] ?? array()) as $line) : ?><li><?php echo esc_html($line); ?></li><?php endforeach; ?></ul>
              </article>
            <?php endforeach; ?>
          </div>
        </section>
      <?php endif; ?>

      <?php if ($procedure) : ?>
        <section class="iclp-block" id="procedure">
          <h2><?php echo esc_html($c['detailProcessTitle'] ?: ($c['processTitle'] ?: 'How it works')); ?></h2>
          <div class="iclp-grid-2">
            <?php foreach ($procedure as $item) : ?>
              <article class="iclp-card">
                <?php if (!empty($item['title'])) : ?><h3><?php echo esc_html($item['title']); ?></h3><?php endif; ?>
                <?php if (!empty($item['text'])) : ?><p><?php echo esc_html($item['text']); ?></p><?php endif; ?>
              </article>
            <?php endforeach; ?>
          </div>
        </section>
      <?php endif; ?>

      <?php if ($gallery) : ?>
        <section class="iclp-block" id="gallery">
          <h2><?php echo esc_html($c['galleryTitle'] ?: 'Gallery'); ?></h2>
          <div class="iclp-grid-3">
            <?php foreach ($gallery as $img) : ?>
              <figure class="iclp-card media">
                <img src="<?php echo esc_url($img['url']); ?>" alt="<?php echo esc_attr($img['alt'] ?: $page['title']); ?>" loading="lazy" />
                <?php if (!empty($img['alt'])) : ?><figcaption><?php echo esc_html($img['alt']); ?></figcaption><?php endif; ?>
              </figure>
            <?php endforeach; ?>
          </div>
        </section>
      <?php endif; ?>

      <?php if ($reviews) : ?>
        <section class="iclp-block" id="reviews">
          <h2><?php echo esc_html($c['reviewsTitle'] ?: 'Customer reviews'); ?></h2>
          <?php if (!empty($c['reviewsIntro'])) : ?><p class="iclp-lead"><?php echo esc_html($c['reviewsIntro']); ?></p><?php endif; ?>
          <div class="iclp-grid-2">
            <?php foreach ($reviews as $item) : ?>
              <article class="iclp-card">
                <?php if (!empty($item['image'])) : ?>
                  <img class="iclp-avatar" src="<?php echo esc_url($item['image']); ?>" alt="<?php echo esc_attr($item['name'] ?: 'Reviewer'); ?>" loading="lazy" />
                <?php endif; ?>
                <?php if (!empty($item['rating'])) : ?>
                  <p class="iclp-stars"><?php echo esc_html(str_repeat('★', (int) $item['rating']) . str_repeat('☆', max(0, 5 - (int) $item['rating']))); ?></p>
                <?php endif; ?>
                <?php if (!empty($item['quote'])) : ?><p>“<?php echo esc_html($item['quote']); ?>”</p><?php endif; ?>
                <?php if (!empty($item['name'])) : ?><h3><?php echo esc_html($item['name']); ?></h3><?php endif; ?>
              </article>
            <?php endforeach; ?>
          </div>
        </section>
      <?php endif; ?>

      <?php if (!empty($c['faqs'])) : ?>
        <section class="iclp-block" id="faqs">
          <h2><?php echo esc_html($c['faqsTitle'] ?: 'Frequently Asked Questions'); ?></h2>
          <?php if (!empty($c['faqsIntro'])) : ?><p class="iclp-lead"><?php echo esc_html($c['faqsIntro']); ?></p><?php endif; ?>
          <?php foreach ($c['faqs'] as $faq) : ?>
            <details>
              <summary><?php echo esc_html($faq['q'] ?? ''); ?></summary>
              <p><?php echo esc_html($faq['a'] ?? ''); ?></p>
            </details>
          <?php endforeach; ?>
        </section>
      <?php endif; ?>
    </div>

    <aside class="iclp-side">
      <div class="iclp-card">
        <h3><?php echo esc_html($c['sideRailTitle'] ?: 'Ship with complete docs'); ?></h3>
        <p><?php echo esc_html($c['sideRailText']); ?></p>
        <a class="iclp-btn accent" href="#iclp-lead-form"><?php echo esc_html($c['formSubmitLabel'] ?: 'Get Free Consultation'); ?></a>
      </div>
      <?php if ($phone || $whatsapp) : ?>
      <div class="iclp-card">
        <h3><?php echo esc_html($c['sideHelpTitle'] ?: 'Need help?'); ?></h3>
        <p><?php echo esc_html($c['sideHelpText']); ?></p>
        <?php if ($phone) : ?><a class="iclp-btn soft wide" href="tel:<?php echo esc_attr($tel); ?>">Call <?php echo esc_html($phone); ?></a><?php endif; ?>
        <?php if ($whatsapp) : ?><a class="iclp-btn accent wide" href="https://wa.me/<?php echo esc_attr($wa); ?>" target="_blank" rel="noopener">WhatsApp</a><?php endif; ?>
      </div>
      <?php endif; ?>
    </aside>
  </div>

  <section class="iclp-bottom-cta">
    <h2><?php echo esc_html($c['bottomCtaText'] ?: 'Talk to an expert'); ?></h2>
    <p><?php echo esc_html($c['bottomCtaSubtitle']); ?></p>
    <a class="iclp-btn accent" href="#iclp-lead-form"><?php echo esc_html($c['formSubmitLabel'] ?: 'Get Free Consultation'); ?></a>
  </section>

  <footer class="iclp-footer">
    <p><strong><?php echo esc_html($legal); ?></strong></p>
    <p>
      Email: <a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a>
      <?php if ($phone) : ?> · Phone: <a href="tel:<?php echo esc_attr($tel); ?>"><?php echo esc_html($phone); ?></a><?php endif; ?>
    </p>
    <p><?php echo esc_html($c['footerBlurb'] ?: ('Landing page for ' . $page['title'] . '. Offer and contacts match this page.')); ?></p>
    <p class="iclp-policy">© <?php echo esc_html(gmdate('Y')); ?> <?php echo esc_html($legal); ?>. Contact us for scope, timelines, and commercials.</p>
  </footer>

  <?php if ($whatsapp) : ?>
    <a class="iclp-float-wa" href="https://wa.me/<?php echo esc_attr($wa); ?>" target="_blank" rel="noopener" aria-label="WhatsApp">WA</a>
  <?php endif; ?>
</div>

(function ($) {
  function parseContent() {
    var el = document.getElementById("iclp_content_json");
    if (!el) return {};
    try {
      return JSON.parse(el.value || "{}");
    } catch (error) {
      alert("Content JSON is invalid. Fix it before adding gallery/review items.");
      throw error;
    }
  }

  function writeContent(content) {
    var el = document.getElementById("iclp_content_json");
    if (!el) return;
    el.value = JSON.stringify(content, null, 2);
  }

  function openMedia(callback) {
    var frame = wp.media({
      title: "Select image",
      button: { text: "Use image" },
      multiple: false,
    });
    frame.on("select", function () {
      var attachment = frame.state().get("selection").first().toJSON();
      callback(attachment);
    });
    frame.open();
  }

  $(document).on("click", ".iclp-media-btn", function (event) {
    event.preventDefault();
    var target = document.getElementById($(this).data("target"));
    if (!target) return;
    openMedia(function (attachment) {
      target.value = attachment.url || "";
    });
  });

  $("#iclp-add-gallery-image").on("click", function (event) {
    event.preventDefault();
    openMedia(function (attachment) {
      var content = parseContent();
      content.gallery = Array.isArray(content.gallery) ? content.gallery : [];
      content.gallery.push({
        url: attachment.url || "",
        alt: attachment.alt || attachment.title || "",
        show: true,
      });
      writeContent(content);
    });
  });

  $("#iclp-add-review").on("click", function (event) {
    event.preventDefault();
    var content = parseContent();
    content.reviewPool = Array.isArray(content.reviewPool) ? content.reviewPool : [];

    function pushReview(imageUrl) {
      content.reviewPool.push({
        quote: "",
        name: "",
        rating: 5,
        image: imageUrl || "",
        show: true,
      });
      writeContent(content);
      alert("Review added to content JSON. Fill quote/name, then update the page.");
    }

    if (window.confirm("Attach an image from Media Library to this review?")) {
      openMedia(function (attachment) {
        pushReview(attachment.url || "");
      });
    } else {
      pushReview("");
    }
  });
})(jQuery);

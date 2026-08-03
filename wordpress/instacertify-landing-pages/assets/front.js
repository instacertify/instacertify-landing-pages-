(function () {
  function getUtm() {
    var params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      gclid: params.get("gclid") || "",
    };
  }

  document.querySelectorAll(".iclp-lead-form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!window.ICLP) return;

      var data = new FormData(form);
      data.append("action", "iclp_submit_lead");
      data.append("nonce", ICLP.nonce);
      var utm = getUtm();
      Object.keys(utm).forEach(function (key) {
        data.append(key, utm[key]);
      });

      var button = form.querySelector('button[type="submit"]');
      var success = form.parentElement.querySelector(".iclp-form-success");
      if (button) button.disabled = true;

      fetch(ICLP.ajaxUrl, {
        method: "POST",
        body: data,
        credentials: "same-origin",
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (payload) {
          if (!payload.success) {
            throw new Error((payload.data && payload.data.error) || "Failed to submit");
          }
          form.reset();
          if (success) {
            success.hidden = false;
            success.textContent =
              form.getAttribute("data-success") ||
              "Thanks! Our team will contact you shortly.";
          }
        })
        .catch(function (error) {
          alert(error.message || "Failed to submit");
        })
        .finally(function () {
          if (button) button.disabled = false;
        });
    });
  });
})();

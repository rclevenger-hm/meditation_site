(function () {
  "use strict";

  function syncPressedState(selector) {
    document.querySelectorAll(selector).forEach(function (button) {
      button.setAttribute("aria-pressed", button.classList.contains("is-selected") ? "true" : "false");
    });
  }

  function syncAll() {
    syncPressedState(".mode-button");
    syncPressedState(".duration-button");
  }

  document.querySelectorAll(".mode-button, .duration-button").forEach(function (button) {
    button.addEventListener("click", syncAll);
  });

  syncAll();
})();

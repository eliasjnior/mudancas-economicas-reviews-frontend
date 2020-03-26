import Vue from "vue";

import App from "./App";

window.VueApps = window.VueApps || {};

document.querySelectorAll("[data-review]").forEach((el, index) => {
  VueApps[index] = new Vue({ el, render: (h) => <App /> });
});

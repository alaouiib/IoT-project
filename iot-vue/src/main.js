import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./../node_modules/bulma/css/bulma.css";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

Vue.use(Buefy, {
  defaultIconPack: "fas",
  // defaultContainerElement: "#content"
  // ...
});
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

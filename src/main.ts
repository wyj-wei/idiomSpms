import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "../src/assets/style/reset.scss";
import "../src/assets/style/global.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "./util/axios";

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";

// import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./scss/utils.scss";
import VueSweetAlert from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import VeeValidateRules from "@vee-validate/rules";
import { setLocale, localize } from "@vee-validate/i18n";
import zhTw from "@vee-validate/i18n/dist/locale/zh_TW.json";

Object.keys(VeeValidateRules).forEach((rule) => {
  defineRule(rule, VeeValidateRules[rule]);
});

configure({
  generateMessage: localize({
    zh_TW: zhTw,
  }),
  validateOnInput: true, // 調整為輸入字元立即進行驗證
});

setLocale("zh_TW");

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VueSweetAlert);

app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);
app.mount("#app");

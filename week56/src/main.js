import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";

// import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import VueSweetAlert from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Form, Field, ErrorMessage, defineRule } from "vee-validate";
import VeeValidateRules from "@vee-validate/rules";

Object.keys(VeeValidateRules).forEach((rule) => {
  defineRule(rule, VeeValidateRules[rule]);
});

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VueSweetAlert);

app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);
app.mount("#app");

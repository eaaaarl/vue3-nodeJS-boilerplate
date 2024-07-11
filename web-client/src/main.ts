import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from "./router";
import Toast from "vue-toastification";
import VueAwesomePaginate from 'vue-awesome-paginate';

import "jquery";
import "admin-lte/dist/css/adminlte.min.css";
import "admin-lte/dist/js/adminlte.min.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "vue-toastification/dist/index.css";
import "vue-awesome-paginate/dist/style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(VueAwesomePaginate);
app.use(Toast);
app.use(router);
app.use(pinia);
app.mount("#app");
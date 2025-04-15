import { createApp } from "vue";
import { store, router } from "./providers";
import { vuetify, loadFonts } from "./plugins";
import PrimeVue from "primevue/config";

import "primevue/resources/themes/aura-light-blue/theme.css";

import App from "./index.vue";
loadFonts();

const initializeApp = createApp(App)
    .use(store)
    .use(router)
    .use(vuetify)
    .use(PrimeVue);
export const app = initializeApp;

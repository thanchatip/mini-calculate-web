import { defineNuxtConfig } from "nuxt/config";
import aura from "@primevue/themes/aura";
import { definePreset, palette } from "@primevue/themes";

const MyPreset = definePreset(aura, {
  semantic: {
    primary: palette("#E82583"),
  },
});

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@primevue/nuxt-module"],
  primevue: {
    usePrimeVue: true,
    options: {
      ripple: true,
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: ".dark",
          cssLayer: false,
        },
      },
    },
  },
  css: [
    "assets/fonts/fonts.css",
    "assets/styles/main.scss",
    "primeicons/primeicons.css",
  ],
});

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify, ThemeDefinition } from "vuetify";

import { mdi } from "vuetify/iconsets/mdi";
import { theme } from "@/shared/ui";
const myCustomLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        primary: theme.primary,
        secondary: theme.secondary,
        background: theme.background,
        surface: theme.surface,
        //
        error: theme.error,
        info: theme.info,
        success: theme.success,
        warning: theme.warning,
    },
};

export const vuetify = createVuetify({
    icons: {
        defaultSet: "mdi",
        sets: {
            mdi,
        },
    },
    defaults: {
        global: {
            hideDetails: "auto",
        },
        VBtn: {
            // variant: "outlined",
            size: "small",
            density: "default",
            style: {
                "font-size": "0.875rem",
                "font-weight": 400,
                "line-height": "1.25rem",
                "letter-spacing": "0.0178571429em",
                "font-family": ' "Roboto", sans-serif',
                "text-transform": "none",
            },
        },
        VTooltip: {
            activator: "parent",
        },
        VDialog: {
            VCard: {
                rounded: "lg",
            },
        },
        VTextField: {
            density: "compact",
            variant: "outlined",
        },
        VSelect: {
            density: "compact",
            variant: "outlined",
        },
        VLabel: {
            density: "compact",
            variant: "outlined",
            size: "small",
        },
        VForm: {
            VTextField: {
                density: "compact",
                variant: "outlined",
            },
            VAutocomplete: {
                density: "compact",
                variant: "outlined",
            },
        },
        VCardText: {
            text: "small",
        },
    },
    theme: {
        defaultTheme: "myCustomLightTheme",
        variations: {
            colors: ["primary", "secondary", "editor", "editorBg"],
            lighten: 5,
            darken: 5,
        },
        themes: {
            myCustomLightTheme,
        },
    },
});

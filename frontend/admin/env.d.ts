/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VUE_APP_SITE_DOMAIN: string;
    readonly VUE_APP_SITE_LOGIN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

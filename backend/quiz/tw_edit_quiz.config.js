/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resource/js/edit/*.js",
        "./view/add2/*.php",
        // "../view/components/APP/**/*.{html,js,php}",
        // "../view/layouts/*.{html,js,php}",
    ],
    experimental: {
        optimizeUniversalDefaults: true,
    },
    corePlugins: {
        preflight: false,
    },
    safelist: [],
    theme: {
        extend: {
            colors: {},
        },
    },
    plugins: [
        // require('@tailwindcss/forms'),
    ],
};

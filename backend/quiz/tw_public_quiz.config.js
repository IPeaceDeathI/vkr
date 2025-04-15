/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./resource/js/public2/*.js", "./view/public2/show.php"],
    experimental: {
        optimizeUniversalDefaults: true,
    },
    corePlugins: {
        // preflight: false,
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

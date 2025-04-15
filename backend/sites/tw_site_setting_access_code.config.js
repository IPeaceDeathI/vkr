/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./view/settings/site/access_code_html.php",
  ],
  corePlugins: {
    preflight: false,
  },
  experimental: {
    optimizeUniversalDefaults: true
  },
  safelist: [
  ],
  theme: {
    extend: {
      colors: {
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}


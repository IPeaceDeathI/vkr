/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./view/settings/site/sub_domain_html.php",
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


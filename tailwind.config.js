const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        sm: '0 0px 2px var(--tw-shadow-color)',
        DEFAULT: '0 0px 4px var(--tw-shadow-color)',
        lg: '0 0px 16px var(--tw-shadow-color)',
      },
      typography: {
        DEFAULT: {
          css: {
            kbd: {
              backgroundColor: 'var(--tw-prose-invert-body)',
              borderRadius: '0',
              padding: '2px 4px',
              margin: '0 2px',
              boxShadow: '-2px 2px 0px 0px var(--tw-prose-lead)',
            },
            'pre code': {
              width: '0',
              display: 'block',
            }
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}

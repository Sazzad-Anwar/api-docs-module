/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
    textColor: theme => ({
      ...theme('colors'),
      "primary-400": "#F9F9F9",
      "dark-primary-40": "#262626",
      "dark-primary-50": "#212121",
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      "primary-400": "#F9F9F9",
      "dark-primary-40": "#262626",
      "dark-primary-50": "#212121",
    }),
    borderColor: theme => ({
      ...theme('colors'),
      "primary-400": "#F9F9F9",
      "dark-primary-40": "#262626",
      "dark-primary-50": "#212121",
    })
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')],
}
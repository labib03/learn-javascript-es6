/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './*.html',
    './src/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
  ],
  content: [
    "./node_modules/flowbite/**/*.js"
]
}

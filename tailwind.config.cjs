/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'hover': 'rgba(0,0,0,.02)',
      'post': '#49cc90',
      'postBg': '#e8f6f0',
      'put': '#fca130',
      'putBg': '#fbf1e6',
      'get': '#61affe',
      'getBg': '#ebf3fb',
      'delete': '#f93e3e',
      'deleteBg': '#fbe7e7',
    }),
    extend: {},
  },
  plugins: [],
}

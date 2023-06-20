/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "buttonColor": "#3d5a80",
        "buttonSubColor": "#24364d",
      }
    }
  },
  plugins: []
};
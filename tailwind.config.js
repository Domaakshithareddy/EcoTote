/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        transform: "transform",
      },
      fontFamily: {
        quicksand: ['"Quicksand"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


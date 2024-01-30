/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ejs}", 
    "./public/**/*.{html,js,ejs}",
    "./views/**/*.{html,js,ejs}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)" 
      }
    },
  },
  plugins: [],
}


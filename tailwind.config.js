/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ejs}",
    "./public/**/*.{html,js,ejs}",
    "./views/**/*.{html,js,ejs}"],
  darkMode: 'class',
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
        clifford: '#da373d',
        "50": "#eff6ff",
        "100": "#dbeafe",
        "200": "#bfdbfe",
        "300": "#93c5fd",
        "400": "#60a5fa",
        "500": "#3b82f6",
        "600": "#2563eb",
        "700": "#1d4ed8",
        "800": "#1e40af",
        "900": "#1e3a8a",
        "950": "#172554",
        secondary: "var(--bg-secondary)",
      }
    },
    fontFamily: {
      'body': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      'sans': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  },
  purge: {
    enabled: true,
    content: [
      "./src/**/*.{html,js,ejs}",
      "./public/**/*.{html,js,ejs}",
      "./views/**/*.{html,js,ejs}"
    ],
    safelist: [
      // Add classes or selectors here that you want to be excluded from purging
      "text-green-400",
      "text-red-400",
      /^bg-/, // This will safelist all classes starting with 'bg-'
      // Add more safelisted classes or selectors as needed
    ],
  },
  plugins: [],
}

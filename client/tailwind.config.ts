/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Example: Add custom colors
      colors: {
        primary: "#1a202c",
        secondary: "#f4f5f7",
      },
    },
  },
  plugins: [],
};

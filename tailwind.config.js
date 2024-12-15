/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        tablet: "769px",
        mobile: "560px",
      },
    },
  },
  variants: {},
  plugins: [],
  // Ensure you are using the JIT mode
  mode: "jit",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F1F1F",
        secondary: "#F2994A",
        graycolor: "#F2F1F0",
        graycolor2: "#909090",
        customwhite: "#fbfbfb",
        yellowcolor: "#EF990F",
      },
      screens: {
        base: "0px",
        sm: "480px",
        sm2: "640px",
        md: "768px",
        lg: "990px",
        xl: "1200px",
        "2xl": "1536px",
        "3xl": "2000px",
      },
      fontSize: {
        unique: "lg:min(0.8rem,0.8vw)",
      },
    },
  },
  plugins: [],
};

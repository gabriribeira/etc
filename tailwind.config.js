/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fcfcfc",
        black: "#212121",
        black90: "#373737",
        black80: "#4D4D4D",
        black70: "#646464",
        black60: "#7A7A7A",
        black50: "#909090",
        black40: "#A6A6A6",
        black30: "#BCBCBC",
        black20: "#D3D3D3",
        black10: "#E9E9E9",
        blue: "#0f4c81",
        blue80: "#3f709a",
        blue60: "#6f94b3",
        blue40: "#9fb7cd",
        blue20: "#cfdbe6",
        salmon: "#ff6f61",
        salmon80: "#ff8c81",
        salmon60: "#ffA9a0",
        salmon40: "#ffc5c0",
        salmon20: "#ffe2df",
        green: "#84b486",
        green80: "#b1cfb1",
        green60: "#b5d2b6",
        green20: "#e6f0e7",
      },
    },
    screens: {
      sm: "320px",
      md: "640px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1600px",
    },
    display: ["group-hover"],
    animation: {
      wiggle: "wiggle 0.4s ease-in-out infinite",
      spinner: "spin 3s linear infinite",
    },
    keyframes: {
      wiggle: {
        "0%, 100%": { transform: "rotate(-0.3deg)" },
        "50%": { transform: "rotate(0.3deg)" },
      },
    },
  },
  plugins: [],
  variants: {
    scrollbar: ["rounded"],
  },
};

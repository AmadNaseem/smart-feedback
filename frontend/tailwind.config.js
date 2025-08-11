module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./styles/**/*.{css,scss}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        secondary: "#A21CAF",
        accent: "#38BDF8",
        success: "#22C55E",
        warning: "#F59E42",
        error: "#EF4444",
        info: "#0EA5E9",
        pink: "#EC4899",
        slate: "#64748B",
        dark: "#0F172A",
        light: "#F1F5F9",
      },
    },
  },
  plugins: [],
};

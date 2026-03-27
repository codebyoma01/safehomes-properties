export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#1e40af",
        success: "#10b981",
        danger: "#ef4444",
        warning: "#f59e0b",
        dark: "#1f2937",
        light: "#f3f4f6",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

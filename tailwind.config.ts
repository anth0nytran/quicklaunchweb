import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#ff6a00"
      }
    }
  },
  plugins: []
};

export default config;

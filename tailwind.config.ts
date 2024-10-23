import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    screens: {
      "1560": {"max": "1560px"},
      "1440": {"max": "1440px"},
      "1240": {"max": "1240px"},
      "1056": {"max": "1056px"},
      "995": {"max": '995px'},
      "895": {"max": '895px'},
      "695": {"max": '695px'},
      "595": {"max": '595px'},
      "495": {"max": '495px'},
      "400": {"max": '400px'},
    },
  },
  plugins: [],
};
export default config;

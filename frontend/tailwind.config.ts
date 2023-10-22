import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "radial-gradient": "radial-gradient(transparent, black)"
      },
      padding: {
        "desktop": "8rem",
        "tablet": "4rem",
        "smartphone": "0.5rem",
      },
      colors: {
        "default-red": "#CF2C2C"
      },
      boxShadow: {
        "3xl": "0 0 10px 0px rgb(0 0 0 / 71%)"
      }
    },
    
    screens: {
      smartphone: {
        max: "640px",
        min: "0px"
      },
      tablet: {
        max: "1150px",
        min: "640px"
      },
      mobile: {
        max: "1150px"
      }
    }
  },
  plugins: [],
};
export default config;

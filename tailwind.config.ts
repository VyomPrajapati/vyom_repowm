import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: "#5865F2",
        instagram: "#E1306C",
        youtube: "#FF0000",
        border: "#E5E7EB",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        "mb":{max:"640px"},
        "mobile":"350px",
        "tablet":"768px",
        "sm-laptop": "1080px",
        "md-laptop": "1440px", // For 15.6-inch & 16-inch laptops
        "lg": "1600px", 
        "lg-laptop": "1600px",// Large PCs
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
    },
    
  },
  
  plugins: [],
};

export default config;

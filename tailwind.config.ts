import { heroui } from "@heroui/theme";
import { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

import plugin from "tailwindcss/plugin";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./app/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./components/**/*.{html,js,ts,jsx,tsx,mdx}",
    // './node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}',
    "./node_modules/@heroui/theme/dist/components/(alert|autocomplete|breadcrumbs|button|calendar|checkbox|chip|date-input|date-picker|divider|drawer|dropdown|input|input-otp|modal|pagination|popover|progress|select|skeleton|slider|toggle|tabs|ripple|spinner|form|listbox|scroll-shadow|menu).js",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "400px",
        sm: "600px",
        md: "900px",
        lg: "1200px",
        compact: "1280px",
        xl: "1536px",
      },
      colors: {
        offBlack: "#141414",
        offGrey: "#282828",
        offWhite: "#FBFEFF",
        offDark: "#1c1c1c",
        default: "#86909F",
        lightBorder: "#EFEFF0",
        darkBorder: "#282828",
        lightGrey: "#EFEFF0",
        "black-800": "#0A2540",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        background: "#FAFAFA",
        success: "#00A36C",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        "brand-teal": "#00c2c2",
        "brand-blue": "#4169e1",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-in-out",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    heroui({
      layout: {
        radius: { small: "6px", medium: "7px", large: "8px" },
        borderWidth: { small: "1px", medium: "1px", large: "1px" },
      },
    }),
    tailwindAnimate,
    plugin(function ({ addUtilities }) {
      const fontSizeUtilities = {
        ".font-grotesk-32-500": {
          fontSize: "32px",
          fontWeight: "500",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-grotesk-40-500": {
          fontSize: "40px",
          fontWeight: "500",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-28-700": {
          fontSize: "28px",
          fontWeight: "700",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-22-700": {
          fontSize: "22px",
          fontWeight: "700",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-20-700": {
          fontSize: "20px",
          fontWeight: "700",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-18-700": {
          fontSize: "18px",
          fontWeight: "700",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-16-700": {
          fontSize: "16px",
          fontWeight: "700",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-20-500": {
          fontSize: "20px",
          fontWeight: "500",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-20-600": {
          fontSize: "20px",
          fontWeight: "600",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-18-500": {
          fontSize: "18px",
          fontWeight: "500",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-16-500": {
          fontSize: "16px",
          fontWeight: "500",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-15-500": {
          fontSize: "15px",
          fontWeight: "500",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-12-500": {
          fontSize: "12px",
          fontWeight: "500",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-14-400": {
          fontSize: "14px",
          fontWeight: "400",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-12-700": {
          fontSize: "12px",
          fontWeight: "700",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-12-400": {
          fontSize: "12px",
          fontWeight: "400",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-14-700": {
          fontSize: "14px",
          fontWeight: "700",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-18-400": {
          fontSize: "18px",
          fontWeight: "400",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-14-500": {
          fontSize: "14px",
          fontWeight: "500",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-24-700": {
          fontSize: "24px",
          fontWeight: "700",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-24-500": {
          fontSize: "24px",
          fontWeight: "500",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-heading-10-500": {
          fontSize: "10px",
          fontWeight: "500",
          fontFamily: "Eudoxus Sans, sans-serif",
          lineHeight: "110%",
        },
        ".font-body-11-400": {
          fontSize: "11px",
          fontWeight: "400",
          fontFamily: "Inter, sans-serif",
          lineHeight: "110%",
        },
        ".font-body-11-500": {
          fontSize: "11px",
          fontWeight: "500",
          fontFamily: "Inter, sans-serif",
          lineHeight: "110%",
        },
        ".font-body-16-700": {
          fontSize: "16px",
          fontWeight: "700",
          fontFamily: "Inter, sans-serif",
          lineHeight: "110%",
        },
        ".font-body-10-400": {
          fontSize: "10px",
          fontWeight: "400",
          fontFamily: "Inter, sans-serif",
          lineHeight: "110%",
        },
        ".font-body-12-700": {
          fontSize: "12px",
          fontWeight: "700",
          fontFamily: "Inter, sans-serif",
          lineHeight: "110%",
        },
        ".font-body-12-600": {
          fontSize: "12px",
          fontWeight: "600",
          fontFamily: "Inter, sans-serif",
          lineHeight: "110%",
        },
        ".font-body-10-500": {
          fontSize: "10px",
          fontWeight: "500",
          fontFamily: "Inter, sans-serif",
          lineHeight: "110%",
        },
        ".font-body-14-400": {
          fontSize: "14px",
          fontWeight: "400",
          fontFamily: "Inter, sans-serif",
          lineHeight: "110%",
        },
        ".font-body-12-500": {
          fontSize: "12px",
          fontWeight: "500",
          fontFamily: "Inter, sans-serif",
          lineHeight: "110%",
        },
        ".font-body-56-700": {
          fontSize: "56px",
          fontWeight: "700",
          lineHeight: "110%",
        },
        ".font-body-16-600": {
          fontSize: "16px",
          fontWeight: "600",
          fontFamily: "Inter, sans-serif",
          lineHeight: "110%",
        },
        ".font-body-12-400": {
          fontSize: "12px",
          fontWeight: "400",
          fontFamily: "Inter, sans-serif",
          lineHeight: "110%",
        },
        ".font-body-14-500": {
          fontSize: "14px",
          fontWeight: "500",
          fontFamily: "Inter, sans-serif",
          lineHeight: "110%",
        },
        ".font-body-14-600": {
          fontSize: "14px",
          fontWeight: "600",
          fontFamily: "Inter, sans-serif",
          lineHeight: "110%",
        },
        ".font-body-18-700": {
          fontSize: "18px",
          fontWeight: "700",
          fontFamily: "Inter, sans-serif",
          lineHeight: "110%",
        },
        ".font-body-16-500": {
          fontSize: "16px",
          fontWeight: "500",
          fontFamily: "Inter, sans-serif",
          lineHeight: "110%",
        },
        ".font-body-8-500": {
          fontSize: "8px",
          fontWeight: "500",
          fontFamily: "Inter, sans-serif",
          lineHeight: "110%",
        },
      };

      addUtilities(fontSizeUtilities);
    }),
  ],
};
export default config;

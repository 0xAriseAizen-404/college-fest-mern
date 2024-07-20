/** @type {import('tailwindcss').Config} */
// const defaultTheme = import("tailwindcss/defaultTheme");

export default {
  outputDir: "dist",
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "hero-pattern":
          "url('/assets/energetic-dance-floor-with-people-celebrating-birthday.jpg')",
        "image-1": "url('/assets/3d-music-related-scene.jpg')",
        "image-2": "url('/assets/953.jpg')",
        "image-3": "url('/assets/2259.jpg')",
        "image-4": "url('/assets/2414.jpg')",
        "image-5":
          "url('/assets/Firefly images for college event_where students enjoying in the college event with lights scattering (1).jpg')",
        "image-6":
          "url('/assets/Firefly images for college event_where students enjoying in the college event with lights scattering (3).jpg')",
        "image-7":
          "url('/assets/Firefly images for college event_where students enjoying in the college event with lights scattering (6).jpg')",
        "image-8": "url('/assets/119442-OPOVG5-632.jpg')",
        "image-9": "url('/assets/5566.jpg')",
      },
      colors: {
        "primary-500": "#de283b",
        "primary-600": "#ff6366",
        "secondary-500": "#4070f9",
        "secondary-600": "#5f8aff",
        "off-white": "#D0DFFF",
        "dark-1": "#000000",
        "dark-2": "#09090A",
        "dark-3": "#101012",
        "dark-4": "#1F1F22",
        "light-1": "#FFFFFF",
        "light-2": "#EFEFEF",
        "light-3": "#ffccc4",
        "light-4": "#e3eaff",
        "primary-100": "#6c35de",
        "primary-200": "#a364ff",
        "primary-300": "#ffc7ff",
        "accent-100": "#cb80ff",
        "accent-200": "#373737",
        "text-100": "#ffffff",
        "text-200": "#e0e0e0",
        "bg-100": "#241b35",
        "bg-200": "#342a45",
        "bg-300": "#4d425f",
      },
      screens: {
        xs: "480px",
      },
      width: {
        420: "420px",
        465: "465px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

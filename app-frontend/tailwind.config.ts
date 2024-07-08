export default {
  daisyui: {
    themes: [
      {
        theme: {
          "primary": "#143C89",
          "primary-content": "#FFFFFF",
          "secondary": "#FFFFFF",
          "secondary-content": "#143C89",
          "accent": "#00ff00",
          "neutral": "#D9D9D9",
          "neutral-content": "#143C89",
          "base-100": "#ffffff", 
          "info": "#0000ff",
          "success": "#00ff00",
          "warning": "#00ff00",
          "error": "#ff0000",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ]
};

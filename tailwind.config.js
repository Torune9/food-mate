/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     colors : {
      elegantIndigo: {
        primary: '#5C6BC0',   // Indigo
        secondary: '#3F51B5', // Deep Indigo
        accent: '#FFD54F',    // Golden Yellow
        neutral: '#F5F5F5',   // Light Grey
      },
      // 2. Vibrant Purple
      vibrantPurple: {
        primary: '#9C27B0',   // Vibrant Purple
        secondary: '#AB47BC', // Light Purple
        accent: '#FF7043',    // Coral
        neutral: '#EDE7F6',   // Very Light Lavender
      },
      // 3. Rich Plum
      richPlum: {
        primary: '#8E24AA',   // Plum
        secondary: '#6A1B9A', // Dark Purple
        accent: '#FFCA28',    // Bright Yellow
        neutral: '#FFFFFF',    // White
      },
      // 4. Soft Lavender
      softLavender: {
        primary: '#9575CD',   // Soft Lavender
        secondary: '#7E57C2', // Medium Purple
        accent: '#FFB74D',    // Warm Orange
        neutral: '#F3E5F5',   // Light Lavender
      },
     }
    },
    fontFamily : {
      "varela" : "Varela Round, sans-serif",
      "sora" : "Sora, sans-serif"
    },
  },
  plugins: [],
}
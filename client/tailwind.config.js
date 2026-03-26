/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#4F46E5",
        success: "#10B981",
        danger: "#EF4444",
        ink: "#1F2937",
        cream: "#F8FAFC"
      },
      fontFamily: {
        sans: ["Nunito", "ui-sans-serif", "system-ui"]
      },
      keyframes: {
        pulseXp: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "60%": { transform: "scale(1.05)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "0" }
        },
        flashRight: {
          "0%": { backgroundColor: "rgba(16,185,129,0.08)" },
          "100%": { backgroundColor: "transparent" }
        },
        flashWrong: {
          "0%": { backgroundColor: "rgba(239,68,68,0.08)" },
          "100%": { backgroundColor: "transparent" }
        }
      },
      animation: {
        "pulse-xp": "pulseXp 900ms ease-out",
        "flash-right": "flashRight 700ms ease-out",
        "flash-wrong": "flashWrong 700ms ease-out"
      },
      boxShadow: {
        card: "0 20px 60px rgba(79, 70, 229, 0.12)"
      }
    }
  },
  plugins: []
};

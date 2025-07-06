/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
import scrollbarHide from 'tailwind-scrollbar-hide';
import tailwindcssAnimate from 'tailwindcss-animate';
import lineClamp from '@tailwindcss/line-clamp';
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                xs: "475px",
            },
            colors: {
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                Tprimary: "gray",
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                Tsecondary: "#6b6b6b",
                danger: "#FF6347",
                tertiary: "#FF6347",
                quaternary: "#FF4500",
                quinary: "#FF8C00",
                senary: "#FFA07A",
                septenary: "#FF7F50",
                octonary: "#FF6A4D",
                nonary: "#FF6347",
                denary: "#FF4500",
                white: "#FFFFFF",
                black: "#000000",
                brown: "#784224",
                grey: "#656565",
                lightgreen: "#97C44B",
                gray: {
                    100: "#f7fafc",
                    200: "#edf2f7",
                    300: "#e2e8f0",
                    400: "#cbd5e0",
                    500: "#a0aec0",
                    600: "#718096",
                    700: "#4a5568",
                    800: "#2d3748",
                    900: "#1a202c",
                },
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
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
                    1: "hsl(var(--chart-1))",
                    2: "hsl(var(--chart-2))",
                    3: "hsl(var(--chart-3))",
                    4: "hsl(var(--chart-4))",
                    5: "hsl(var(--chart-5))",
                },
            },
            fontFamily: {
                sans: ["Open Sans", "sans-serif"],
                poppins: ["Poppins", "sans-serif"],
                serif: ["Merriweather", "serif"],
                brand: ["Salsa", "cursive"],
                Abril_Fatface: ["Abril Fatface", "cursive"],
                Playfair_Display: ["Playfair Display", "serif"],
            },
            textColor: {
                brand: "#784224",
            },
            keyframes: {
                expand: {
                    "0%": {
                        width: "0px",
                    },
                    "100%": {
                        width: "200px",
                    },
                },
                diaMove: {
                    "0%": {
                        transform: "translate(50px, 50px)",
                    },
                    "100%": {
                        transform: "translate(0px, 0px)",
                    },
                },
            },
            animation: {
                expand: "expand 0.5s ease",
                diaMove: "diaMove 0.6s ease forwards",
            },
            boxShadow: {
                levitate: "5px 5px 20px rgba(0,0,0,0.3), -5px -5px 20px white",
                "dark-lg": "0px 0px 10px rgba(0,0,0,0.3)",
            },
            textShadow: {
                sm: "0 1px 2px var(--tw-shadow-color)",
                DEFAULT: "0 2px 4px var(--tw-shadow-color)",
                lg: "0 8px 16px var(--tw-shadow-color)",
                solid: "3px 2px 0 var(--tw-shadow-color), -1px -1px 0 var(--tw-shadow-color), 1px -1px 0 var(--tw-shadow-color), 1px 1px 0 var(--tw-shadow-color), -1px 1px 0 var(--tw-shadow-color)",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    "text-shadow": (value) => ({
                        textShadow: value,
                    }),
                },
                { values: theme("textShadow") }
            );
        }),
        scrollbarHide,
        tailwindcssAnimate,
        lineClamp,
        // require("tailwindcss-animate")
        // require("tailwindcss-animate")
    ],
};


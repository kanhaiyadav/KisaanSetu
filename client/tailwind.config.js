/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#97c54b',
                secondary: '#FFA500',
                tertiary: '#FF6347',
                quaternary: '#FF4500',
                quinary: '#FF8C00',
                senary: '#FFA07A',
                septenary: '#FF7F50',
                octonary: '#FF6A4D',
                nonary: '#FF6347',
                denary: '#FF4500',
                white: '#FFFFFF',
                black: '#000000',
                gray: {
                    100: '#f7fafc',
                    200: '#edf2f7',
                    300: '#e2e8f0',
                    400: '#cbd5e0',
                    500: '#a0aec0',
                    600: '#718096',
                    700: '#4a5568',
                    800: '#2d3748',
                    900: '#1a202c',
                },
            },
            fontFamily: {
                sans: ['Open Sans', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
                brand: ['Salsa', 'cursive'],
            },
            textColor: {
                brand: '#784224',
            }
        },
    },
    plugins: [],
}


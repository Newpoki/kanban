/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Plus Jakarta Sans'],
        },
        colors: {
            transparent: 'transparent',
            purple: {
                300: '#A8A4FF',
                500: '#635FC7',
            },
            black: '#00112',
            grey: {
                100: '#F4F7FD',
                300: '#E4EBFA',
                500: '#828FA3',
                700: '#3E3F4E',
                800: '#2B2C37',
            },
            white: '#FFFFFF',
            red: {
                300: '#FF9898',
                500: '#EA5555',
            },
        },
        fontSize: {
            'h-xl': [
                '24px',
                {
                    fontWeight: 700,
                    lineHeight: '30px',
                },
            ],
            'h-l': [
                '18px',
                {
                    fontWeight: 700,
                    lineHeight: '23px',
                },
            ],
            'h-m': [
                '15px',
                {
                    fontWeight: 700,
                    lineHeight: '19px',
                },
            ],
            'h-s': [
                '12px',
                {
                    fontWeight: 700,
                    lineHeight: '15px',
                    letterSpacing: '2.4px',
                },
            ],
            l: [
                '13px',
                {
                    fontWeight: 'medium',
                    lineHeight: '23px',
                },
            ],
            m: [
                '12px',
                {
                    fontWeight: 700,
                    lineHeight: '15px',
                },
            ],
        },
        extend: {},
    },
    plugins: [],
}

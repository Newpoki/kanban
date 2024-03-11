import tailwindCssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        colors: {
            transparent: 'transparent',
            purple: {
                300: '#A8A4FF',
                500: '#635FC7',
            },
            black: '#000112',
            grey: {
                100: '#F4F7FD',
                300: '#E4EBFA',
                500: '#828FA3',
                700: '#3E3F4E',
                800: '#2B2C37',
                900: '#20212C',
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
                    fontWeight: 500,
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
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        screens: {
            md: '768px',
            lg: '1440px',
        },
        fontFamily: {
            sans: ['Plus Jakarta Sans', 'sans-serif'],
        },
        extend: {
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            transitionProperty: {
                width: 'width',
            },
            backgroundImage: {
                'column-placeholder-bg':
                    'linear-gradient(to bottom, #e9effa, rgba(233, 239, 250, 0.5))',
                'dark-column-placeholder-bg':
                    'linear-gradient(to bottom, #2b2c37, rgba(43, 44, 55, 0.5))',
            },
        },
    },
    plugins: [tailwindCssAnimate],
}

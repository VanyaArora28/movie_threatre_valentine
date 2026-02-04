/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cinema: {
                    red: '#8B0000',
                    velvet: '#C41E3A',
                    gold: '#FFD700',
                    brass: '#B5A642',
                    cream: '#FFFDD0',
                    sepia: '#704214',
                },
            },
            fontFamily: {
                playfair: ['Playfair Display', 'serif'],
                cinzel: ['Cinzel', 'serif'],
                courier: ['Courier Prime', 'monospace'],
            },
            animation: {
                'curtain-pull': 'curtainPull 2s ease-in-out',
                'marquee-flicker': 'marqueeFlicker 0.5s infinite alternate',
                'film-grain': 'filmGrain 0.3s steps(10) infinite',
                'reel-spin': 'reelSpin 2s linear infinite',
                'confetti-fall': 'confettiFall 3s ease-out forwards',
            },
            keyframes: {
                curtainPull: {
                    '0%': { transform: 'scaleX(1)' },
                    '100%': { transform: 'scaleX(0)' },
                },
                marqueeFlicker: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' },
                },
                filmGrain: {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '10%': { transform: 'translate(-5%, -10%)' },
                    '30%': { transform: 'translate(3%, -15%)' },
                    '50%': { transform: 'translate(12%, 9%)' },
                    '70%': { transform: 'translate(9%, 4%)' },
                    '90%': { transform: 'translate(-1%, 7%)' },
                },
                reelSpin: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                confettiFall: {
                    '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
                    '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
                },
            },
            backgroundImage: {
                'velvet-texture': "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" /%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.05\"/%3E%3C/svg%3E')",
            },
        },
    },
    plugins: [],
}

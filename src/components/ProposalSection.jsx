import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const ProposalSection = ({ onAccept }) => {
    // State to track the "No" button's position
    const [noButtonPosition, setNoButtonPosition] = useState({ top: '60%', left: '60%' });

    // State to handle text changes if they keep trying
    const [hoverCount, setHoverCount] = useState(0);

    const texts = [
        "No",
        "Are you sure?",
        "Think again!",
        "Last chance!",
        "Don't do this!",
        "I'm crying...",
        "Please?"
    ];

    // Function to move the button to a random spot
    const moveButton = () => {
        const randomX = Math.floor(Math.random() * 80) + 10; // Keep within 10%-90% width
        const randomY = Math.floor(Math.random() * 80) + 10; // Keep within 10%-90% height

        setNoButtonPosition({ top: `${randomY}%`, left: `${randomX}%` });
        setHoverCount(prev => (prev + 1) % texts.length);
    };

    const handleYesClick = () => {
        // 1. Trigger Confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#DC143C', '#FFFFFF'] // Gold, Red, White
        });

        // 2. Persist the "Yes" state
        localStorage.setItem('valentineAccepted', 'true');

        // 3. Notify parent component to show the countdown
        onAccept();
    };

    return (
        <div className="relative w-full h-[400px] flex flex-col items-center justify-center border-y-4 border-amber-500/30 my-10 bg-black/20 overflow-hidden">

            {/* Marquee Question */}
            <div className="z-10 text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-bold text-amber-400 font-serif drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wider">
                    WILL YOU BE MY <br />
                    <span className="text-red-500 text-5xl md:text-7xl drop-shadow-[0_0_10px_rgba(220,20,60,0.8)]">VALENTINE?</span>
                </h2>
            </div>

            {/* Buttons Container */}
            <div className="flex gap-8 items-center justify-center w-full relative h-20">

                {/* YES BUTTON - The Anchor */}
                <button
                    onClick={handleYesClick}
                    className="z-20 px-8 py-3 bg-gradient-to-b from-green-600 to-green-800 text-amber-100 font-bold text-xl rounded border-2 border-amber-400 shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:scale-110 transition-transform duration-200 cursor-pointer"
                >
                    YES, ABSOLUTELY!
                </button>

                {/* NO BUTTON - The Jumper */}
                <button
                    onMouseEnter={moveButton} // Moves on hover (Desktop)
                    onClick={moveButton}      // Moves on click (Mobile)
                    style={{
                        position: 'absolute',
                        top: noButtonPosition.top,
                        left: noButtonPosition.left,
                        transition: 'all 0.2s ease-out' // Smooth glide
                    }}
                    className="z-20 px-6 py-2 bg-gradient-to-b from-gray-700 to-gray-900 text-gray-400 font-bold text-lg rounded border border-gray-600 shadow-lg cursor-not-allowed whitespace-nowrap"
                >
                    {texts[hoverCount]}
                </button>

            </div>

            {/* Retro Decoration Background */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
        </div>
    );
};

export default ProposalSection;
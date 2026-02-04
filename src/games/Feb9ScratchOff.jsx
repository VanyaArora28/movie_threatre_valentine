import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import audioManager from '../utils/audioManager';

// 1. The Hidden Letter (Bottom Layer)
const LetterContent = () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#fdfbf7] text-cinema-sepia font-courier text-center leading-normal shadow-inner select-none">

        {/* Header: Reduced to text-base */}
        <p className="mb-2 font-bold text-base text-cinema-red">My Dearest,</p>

        {/* Body: Reduced to text-[10px] (approx 10px) and text-xs (12px) for larger screens */}
        <p className="text-[10px] md:text-xs mb-2">
            Before you, I didn't know what I was missing. Then you walked into my life and everything changed. Suddenly, the world had color, warmth, texture. When you're near me, I feel alive in ways I can't explain—my heart races, my skin tingles, my mind goes quiet except for thoughts of you. I want to know every part of you—your soul, your dreams, your fears.
        </p>
        <p className="text-[10px] md:text-xs mb-2">
            You're not just someone I love; you're someone I crave—emotionally, physically, completely. I never want to stop feeling this way about you. I love you - completely, entirely, forever.
        </p>

        {/* Signature: Reduced to text-sm */}
        <p className="font-cinzel font-bold text-sm text-cinema-gold mt-1">- Forever Yours</p>
    </div>
);

export default function Feb9ScratchOff({ onComplete }) {
    const [isScratched, setIsScratched] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // Refs for direct DOM manipulation (Performance critical)
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const isDrawing = useRef(false); // Using Ref instead of State to prevent re-renders

    // 2. Audio Setup
    useEffect(() => {
        audioManager.loadSound('sita-theme', '/audio/sita_rama.mp4', { loop: true, volume: 0.5 });
        return () => { audioManager.stop('sita-theme'); };
    }, []);

    const toggleAudio = () => {
        if (isPlaying) { audioManager.pause('sita-theme'); } else { audioManager.play('sita-theme'); }
        setIsPlaying(!isPlaying);
    };

    // 3. Robust Scratch Logic
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        // Match canvas size to container
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        canvas.width = width;
        canvas.height = height;

        // Draw the Gold Cover
        ctx.fillStyle = '#D4AF37'; // Gold color
        ctx.fillRect(0, 0, width, height);

        // Add "Scratch Me" Text
        ctx.font = 'bold 20px Courier New';
        ctx.fillStyle = '#B8860B';
        ctx.textAlign = "center";
        ctx.fillText("Scratch to Reveal", width / 2, height / 2);

        // --- Percentage Checker ---
        const checkRevealStatus = () => {
            // Get all pixel data
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;
            let transparentPixels = 0;

            // Check every 10th pixel to improve performance
            for (let i = 3; i < data.length; i += 40) {
                if (data[i] === 0) {
                    transparentPixels++;
                }
            }

            const totalPixelsChecked = data.length / 40;
            const percentage = (transparentPixels / totalPixelsChecked) * 100;

            // Trigger reveal if more than 50% is scratched
            if (percentage > 50) {
                setIsScratched(true);
            }
        };

        // --- Scratch Function ---
        let scratchStep = 0;
        const scratch = (x, y) => {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 35, 0, Math.PI * 2); // Brush size
            ctx.fill();

            // Only check percentage every 15 scratches to prevent lag
            scratchStep++;
            if (scratchStep % 15 === 0 && !isScratched) {
                checkRevealStatus();
            }
        };

        const handleMouseMove = (e) => {
            if (!isDrawing.current) return;
            const rect = canvas.getBoundingClientRect();
            scratch(e.clientX - rect.left, e.clientY - rect.top);
        };

        const handleTouchMove = (e) => {
            if (!isDrawing.current) return;
            // Prevent scrolling while scratching
            if (e.cancelable) e.preventDefault();

            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            scratch(touch.clientX - rect.left, touch.clientY - rect.top);
        };

        // Attach listeners directly to avoid React synthetic event lag
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('touchmove', handleTouchMove);
        };
    }, []); // Empty array ensures this runs ONCE and never resets

    // Start/Stop Handlers
    const startScratching = () => { isDrawing.current = true; };
    const stopScratching = () => { isDrawing.current = false; };

    return (
        <div className="w-full max-w-2xl mx-auto pb-12">

            {/* --- HEADER --- */}
            <div className="flex justify-between items-center mb-8 border-b border-amber-500/30 pb-4">
                <h2 className="text-amber-500 font-cinzel text-xl tracking-wider hidden md:block">FEB 9: SITA RAMAM</h2>
                <button
                    onClick={onComplete}
                    className="bg-red-600 text-white font-bold px-4 py-2 rounded border-2 border-red-800 hover:bg-red-700 flex items-center gap-2 text-sm shadow-lg transform hover:scale-105 transition-transform"
                >
                    🏠 RETURN TO LOBBY
                </button>
            </div>

            {/* --- POLAROIDS --- */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-10">
                <div className="bg-white p-3 pb-8 shadow-lg transform -rotate-2 w-48">
                    <div className="h-40 bg-gray-200 overflow-hidden relative">
                        <img src="/memories/usl5.jpeg" alt="Memory 5" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-courier text-center text-gray-800 text-xs mt-3 font-bold">"To the queen who left behind everything for a soldier with 600 rupees monthly pay. Goodbye Princess Noorjahan</p>
                </div>
                <div className="bg-white p-3 pb-8 shadow-lg transform rotate-2 w-48">
                    <div className="h-40 bg-gray-200 overflow-hidden relative">
                        <img src="/memories/usl6.jpeg" alt="Memory 6" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-courier text-center text-gray-800 text-xs mt-3 font-bold">“How dangerous it is if someone sees us?”
                        “Now I realize, how beautiful danger can be, Sita."</p>
                </div>
            </div>

            {/* --- GAME CARD --- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="ticket-stub p-6 rounded-lg bg-amber-50 border-4 border-cinema-sepia shadow-2xl relative overflow-hidden"
            >
                <div className="text-center relative z-10 mb-4">
                    <h2 className="font-cinzel text-3xl text-cinema-sepia mb-2">THE LOST LETTER</h2>
                    <p className="font-courier text-cinema-sepia/80 italic text-sm">
                        Scratch the gold seal to reveal the hidden message...
                    </p>
                </div>

                <div className="text-center mb-6 relative z-10">
                    <button
                        onClick={toggleAudio}
                        className="px-4 py-2 bg-cinema-sepia text-cinema-cream font-courier font-bold text-xs rounded-full hover:bg-cinema-sepia/80 transition-colors border-2 border-cinema-brass"
                    >
                        {isPlaying ? '⏸ PAUSE THEME' : '▶ PLAY SITA RAMAM THEME'}
                    </button>
                </div>

                {/* --- SCRATCH AREA (Custom & Stable) --- */}
                <div className="flex justify-center relative z-10">
                    <div
                        ref={containerRef}
                        className="relative w-[300px] h-[400px] rounded-lg overflow-hidden border-4 border-cinema-gold shadow-inner bg-white select-none"
                    >
                        {/* 1. The Hidden Content (Bottom Layer) */}
                        <div className="absolute inset-0 z-0">
                            <LetterContent />
                        </div>

                        {/* 2. The Scratch Canvas (Top Layer) */}
                        <canvas
                            ref={canvasRef}
                            className="absolute inset-0 z-10 cursor-crosshair touch-none"
                            onMouseDown={startScratching}
                            onMouseUp={stopScratching}
                            onMouseLeave={stopScratching}
                            onTouchStart={startScratching}
                            onTouchEnd={stopScratching}
                        />
                    </div>
                </div>

                <AnimatePresence>
                    {isScratched && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-center relative z-10 mt-6"
                        >
                            <p className="font-cinzel text-xl text-cinema-red font-bold">✓ Revealed!</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Background Pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] z-0"></div>
            </motion.div>
        </div>
    );
};
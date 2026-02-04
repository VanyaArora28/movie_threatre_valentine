import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import audioManager from '../utils/audioManager'

// --- Game Data ---
const FLAVORS = [
    { id: 'vanilla', name: 'Vanilla', color: '#FFF8DC', emoji: '🍦' },
    { id: 'chocolate', name: 'Chocolate', color: '#8B4513', emoji: '🍫' },
    { id: 'strawberry', name: 'Strawberry', color: '#FFB6C1', emoji: '🍓' },
    { id: 'pistachio', name: 'Pistachio', color: '#93C572', emoji: '🌰' },
    { id: 'lemon', name: 'Lemon', color: '#FFF44F', emoji: '🍋' },
]

const TOPPINGS = [
    { id: 'cherry', name: 'Cherry', emoji: '🍒' },
    { id: 'sprinkles', name: 'Sprinkles', emoji: '🌈' },
    { id: 'cookie', name: 'Cookie', emoji: '🍪' },
]

export default function Feb10GelatoBuilder({ onComplete }) {
    // --- State ---
    const [gameStarted, setGameStarted] = useState(false)
    const [score, setScore] = useState(0) // Customers served
    const [targetOrder, setTargetOrder] = useState([]) // Current customer's order
    const [currentStack, setCurrentStack] = useState([]) // What player has built
    const [timeLeft, setTimeLeft] = useState(45)
    const [gameOver, setGameOver] = useState(false)
    const [win, setWin] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [feedback, setFeedback] = useState(null) // "Perfect!" or "Wrong!"

    // --- Audio Setup ---
    useEffect(() => {
        // Ensure 'la-dolce-villa.mp3' is in public/audio/
        audioManager.loadSound('villa-theme', '/audio/la_dolce_villa.mp4', { loop: true, volume: 0.5 })
        return () => { audioManager.stop('villa-theme') }
    }, [])

    const toggleAudio = () => {
        if (isPlaying) { audioManager.pause('villa-theme') } else { audioManager.play('villa-theme') }
        setIsPlaying(!isPlaying)
    }

    // --- Game Timer ---
    useEffect(() => {
        if (!gameStarted || gameOver || win) return

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setGameOver(true)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [gameStarted, gameOver, win])

    // --- Game Logic ---
    const generateNewOrder = () => {
        const difficulty = Math.min(score + 2, 4) // Harder as you go
        const newOrder = []
        for (let i = 0; i < difficulty; i++) {
            const randomFlavor = FLAVORS[Math.floor(Math.random() * FLAVORS.length)]
            newOrder.push(randomFlavor)
        }
        // 50% chance to add a topping
        if (Math.random() > 0.5) {
            newOrder.push(TOPPINGS[Math.floor(Math.random() * TOPPINGS.length)])
        }
        setTargetOrder(newOrder)
        setCurrentStack([])
        setFeedback(null)
    }

    const startGame = () => {
        setGameStarted(true)
        setScore(0)
        setTimeLeft(45)
        setGameOver(false)
        setWin(false)
        generateNewOrder()
    }

    const addToStack = (item) => {
        if (gameOver || win) return
        const newStack = [...currentStack, item]
        setCurrentStack(newStack)

        // Check if full (same length as target)
        if (newStack.length === targetOrder.length) {
            checkOrder(newStack)
        }
    }

    const checkOrder = (stack) => {
        const isCorrect = stack.every((item, index) => item.id === targetOrder[index].id)

        if (isCorrect) {
            setFeedback("DELIZIOSO! 🤌")
            const newScore = score + 1
            setScore(newScore)

            if (newScore >= 3) {
                setWin(true)
                setTimeout(() => onComplete?.(), 2000)
            } else {
                setTimeout(generateNewOrder, 1000)
            }
        } else {
            setFeedback("MAMMA MIA! (Wrong Order) ❌")
            setTimeout(() => setCurrentStack([]), 1000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto pb-12">

            {/* === 1. HEADER === */}
            <div className="flex justify-between items-center mb-8 border-b border-amber-500/30 pb-4">
                <h2 className="text-amber-500 font-cinzel text-xl tracking-wider hidden md:block">FEB 10: LA DOLCE VILLA</h2>
                <button
                    onClick={onComplete}
                    className="bg-red-600 text-white font-bold px-4 py-2 rounded border-2 border-red-800 hover:bg-red-700 flex items-center gap-2 text-sm shadow-lg transform hover:scale-105 transition-transform"
                >
                    🏠 RETURN TO LOBBY
                </button>
            </div>

            {/* === 2. POLAROIDS === */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-10">
                <div className="bg-white p-3 pb-8 shadow-lg transform -rotate-2 w-48">
                    <div className="h-40 bg-gray-200 overflow-hidden relative">
                        <img src="/memories/usl7.jpeg" alt="Memory 7" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-courier text-center text-gray-800 text-xs mt-3 font-bold">Love isn't always loud. Sometimes it's quiet, steady, and patient.</p>
                </div>
                <div className="bg-white p-3 pb-8 shadow-lg transform rotate-2 w-48">
                    <div className="h-40 bg-gray-200 overflow-hidden relative">
                        <img src="/memories/usl8.jpeg" alt="Memory 8" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-courier text-center text-gray-800 text-xs mt-3 font-bold">I didn't come here looking for love... but somehow, it found me anyway</p>
                </div>
            </div>

            {/* === 3. GAME CARD === */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-b from-yellow-50 to-orange-100 p-6 md:p-8 rounded-lg border-4 border-cinema-gold shadow-2xl relative overflow-hidden"
            >
                {/* Audio Button */}
                <div className="text-center mb-6">
                    <button
                        onClick={toggleAudio}
                        className="px-4 py-2 bg-cinema-sepia text-cinema-cream font-courier font-bold text-xs rounded-full hover:bg-cinema-sepia/80 transition-colors border-2 border-cinema-brass"
                    >
                        {isPlaying ? '⏸ PAUSE MUSIC' : '▶ It is a date'}
                    </button>
                </div>

                <h3 className="font-cinzel text-3xl text-cinema-sepia text-center mb-2">
                    GELATO RUSH 🍦
                </h3>

                {!gameStarted ? (
                    <div className="text-center py-8">
                        <p className="font-courier text-cinema-sepia mb-6 text-sm">
                            The customers are waiting! Look at their order and build the Gelato exactly as shown.<br />
                            <strong>Serve 3 customers before time runs out!</strong>
                        </p>
                        <button onClick={startGame} className="btn-brass text-lg px-8 py-3">
                            OPEN SHOP
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Stats Bar */}
                        <div className="flex justify-between items-center mb-6 bg-white/50 p-3 rounded-lg border border-cinema-sepia/20">
                            <div className="font-courier font-bold text-cinema-sepia">
                                Score: {score}/3
                            </div>
                            <div className={`font-courier font-bold text-xl ${timeLeft < 10 ? 'text-red-600 animate-pulse' : 'text-cinema-sepia'}`}>
                                ⏱ {timeLeft}s
                            </div>
                        </div>

                        {/* Game Area Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* LEFT: The Customer's Order */}
                            <div className="bg-white p-4 rounded-lg border-2 border-dashed border-cinema-gold text-center">
                                <p className="font-cinzel text-xs text-cinema-sepia mb-2 uppercase tracking-widest">Customer Wants:</p>
                                <div className="flex flex-col-reverse items-center gap-1 min-h-[160px] justify-start bg-gray-50 rounded p-2">
                                    <span className="text-4xl filter grayscale opacity-30">🍦</span> {/* Base Cone */}
                                    {targetOrder.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-4xl drop-shadow-md"
                                        >
                                            {item.emoji}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* RIGHT: Your Build */}
                            <div className="bg-white p-4 rounded-lg border-2 border-cinema-sepia text-center relative">
                                <p className="font-cinzel text-xs text-cinema-sepia mb-2 uppercase tracking-widest">You are Building:</p>
                                <div className="flex flex-col-reverse items-center gap-1 min-h-[160px] justify-start bg-blue-50/50 rounded p-2">
                                    <span className="text-4xl">🍦</span> {/* Base Cone */}
                                    {currentStack.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ y: -20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-4xl drop-shadow-md"
                                        >
                                            {item.emoji}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Feedback Overlay */}
                                <AnimatePresence>
                                    {feedback && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 flex items-center justify-center bg-white/90 z-10 rounded-lg"
                                        >
                                            <p className={`font-bold text-xl ${feedback.includes("❌") ? "text-red-600" : "text-green-600"}`}>
                                                {feedback}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* CONTROLS (Ingredients) */}
                        <div className="mt-6">
                            <p className="text-center font-courier text-xs text-cinema-sepia mb-2">- Tap ingredients to add -</p>

                            {/* Flavors */}
                            <div className="flex flex-wrap justify-center gap-2 mb-3">
                                {FLAVORS.map(f => (
                                    <button
                                        key={f.id}
                                        onClick={() => addToStack(f)}
                                        className="w-12 h-12 flex items-center justify-center bg-white rounded-full border-2 border-gray-200 shadow-sm hover:scale-110 transition-transform text-2xl"
                                        disabled={!!feedback || gameOver || win}
                                    >
                                        {f.emoji}
                                    </button>
                                ))}
                            </div>

                            {/* Toppings */}
                            <div className="flex flex-wrap justify-center gap-2">
                                {TOPPINGS.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => addToStack(t)}
                                        className="w-10 h-10 flex items-center justify-center bg-yellow-50 rounded-full border-2 border-yellow-200 shadow-sm hover:scale-110 transition-transform text-xl"
                                        disabled={!!feedback || gameOver || win}
                                    >
                                        {t.emoji}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentStack([])}
                                    className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold border border-red-300 ml-4 hover:bg-red-200"
                                >
                                    CLEAR
                                </button>
                            </div>
                        </div>

                        {/* WIN/LOSE SCREENS */}
                        {win && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 bg-green-600/95 flex flex-col items-center justify-center z-20 text-white p-6 text-center">
                                <h2 className="text-4xl font-cinzel font-bold mb-4">BELLISSIMO! 🇮🇹</h2>
                                <p className="font-courier mb-6">You served all the customers perfectly!</p>
                            </motion.div>
                        )}

                        {gameOver && !win && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 bg-red-900/95 flex flex-col items-center justify-center z-20 text-white p-6 text-center">
                                <h2 className="text-3xl font-cinzel font-bold mb-4">SHOP CLOSED!</h2>
                                <p className="font-courier mb-6">You didn't serve enough customers.</p>
                                <button onClick={startGame} className="bg-white text-red-900 px-6 py-2 rounded-full font-bold hover:bg-gray-200">TRY AGAIN</button>
                            </motion.div>
                        )}
                    </>
                )}
            </motion.div>
        </div>
    )
}
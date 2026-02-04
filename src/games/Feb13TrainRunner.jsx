import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import audioManager from '../utils/audioManager'

export default function Feb13TrainRunner({ onComplete }) {
    // --- STATE ---
    const [gameState, setGameState] = useState('START') // START, PLAYING, WON, LOST
    const [level, setLevel] = useState(1)
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(30)
    const [currentCard, setCurrentCard] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [feedback, setFeedback] = useState(null) // Pop-up text

    // --- GAME DATA ---
    const LEVEL_DATA = {
        1: {
            name: "MUMBAI STATION",
            items: [
                { name: "Water Bottle", type: "KEEP", emoji: "🧴", msg: "Vital for the journey!" },
                { name: "Train Ticket", type: "KEEP", emoji: "🎟️", msg: "Can't travel without it!" },
                { name: "Broken Sandal", type: "KICK", emoji: "👡", msg: "Leave it behind!" },
                { name: "Heavy Luggage", type: "KICK", emoji: "🧳", msg: "Travel light!" },
                { name: "Stray Dog", type: "KICK", emoji: "🐕", msg: "Not on the train!" },
            ]
        },
        2: {
            name: "RATLAM NIGHTS",
            items: [
                { name: "Aditya", type: "KEEP", emoji: "🧍‍♂️", msg: "He looks depressed but rich." },
                { name: "Hotel Decent Guy", type: "KICK", emoji: "🤢", msg: "Bhaiya, paani pilao!" },
                { name: "Ratlam Goons", type: "KICK", emoji: "👺", msg: "Run Geet Run!" },
                { name: "Idli Sambar", type: "KEEP", emoji: "🍛", msg: "Tasty!" },
                { name: "Taxi Driver", type: "KICK", emoji: "🚕", msg: "Scammer!" },
            ]
        },
        3: {
            name: "MANALI DIARIES",
            items: [
                { name: "Anshuman", type: "KICK", emoji: "📱", msg: "Burn the photo!" },
                { name: "Self Love", type: "KEEP", emoji: "👑", msg: "Main Apni Favorite Hoon!" },
                { name: "Aditya (Happy)", type: "KEEP", emoji: "💖", msg: "True Love!" },
                { name: "Past Regrets", type: "KICK", emoji: "😢", msg: "Flush it!" },
                { name: "Snowfall", type: "KEEP", emoji: "❄️", msg: "Romantic!" },
            ]
        }
    }

    // --- AUDIO ---
    useEffect(() => {
        audioManager.loadSound('jwm-theme', '/audio/jab_we_met.mp4', { loop: true, volume: 0.6 })
        return () => { audioManager.stop('jwm-theme') }
    }, [])

    const toggleAudio = () => {
        if (isPlaying) { audioManager.pause('jwm-theme') } else { audioManager.play('jwm-theme') }
        setIsPlaying(!isPlaying)
    }

    // --- GAME LOGIC ---
    // Timer
    useEffect(() => {
        if (gameState !== 'PLAYING') return
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setGameState('LOST')
                    return 0
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [gameState])

    // Pick a card
    useEffect(() => {
        if (gameState === 'PLAYING' && !currentCard) {
            pickRandomCard()
        }
    }, [gameState, currentCard])

    const pickRandomCard = () => {
        const items = LEVEL_DATA[level].items
        const randomItem = items[Math.floor(Math.random() * items.length)]
        // Add unique ID to force re-render if same item picked twice
        setCurrentCard({ ...randomItem, id: Date.now() })
    }

    const handleChoice = (choice) => {
        if (!currentCard) return

        if (choice === currentCard.type) {
            // Correct!
            const newScore = score + 10
            setScore(newScore)
            setFeedback(currentCard.msg)

            // --- UPDATED (EASIER) LEVEL THRESHOLDS ---
            if (level === 1 && newScore >= 30) setLevel(2)       // Was 50
            else if (level === 2 && newScore >= 70) setLevel(3)  // Was 120
            else if (level === 3 && newScore >= 120) winGame()   // Was 200
            else pickRandomCard() // Next card

        } else {
            // Wrong!
            setFeedback("WRONG CHOICE! ❌")
            setTimeLeft(prev => Math.max(0, prev - 5)) // Penalty
            pickRandomCard()
        }

        // Clear feedback after 1s
        setTimeout(() => setFeedback(null), 1000)
    }

    const winGame = () => {
        setGameState('WON')
        setTimeout(() => onComplete?.(), 4000)
    }

    const startGame = () => {
        setGameState('PLAYING')
        setScore(0)
        setLevel(1)
        setTimeLeft(30)
        setCurrentCard(null)
        if (!isPlaying) toggleAudio()
    }

    return (
        <div className="w-full max-w-3xl mx-auto pb-12">

            {/* === 1. HEADER === */}
            <div className="flex justify-between items-center mb-8 border-b border-amber-500/30 pb-4">
                <h2 className="text-amber-500 font-cinzel text-xl tracking-wider hidden md:block">FEB 13: JAB WE MET</h2>
                <button
                    onClick={onComplete}
                    className="bg-red-600 text-white font-bold px-4 py-2 rounded border-2 border-red-800 hover:bg-red-700 flex items-center gap-2 text-sm shadow-lg transform hover:scale-105 transition-transform"
                >
                    🏠 RETURN TO LOBBY
                </button>
            </div>

            {/* === 2. POLAROIDS === */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-10">
                <div className="bg-white p-3 pb-8 shadow-[0_0_15px_rgba(255,165,0,0.4)] transform -rotate-1 hover:rotate-0 transition-transform duration-300 w-48 border-2 border-orange-100">
                    <div className="h-40 bg-gray-200 overflow-hidden border border-gray-100 relative">
                        <img src="/memories/usl14.jpeg" alt="Memory 14" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-courier text-center text-orange-800 text-xs mt-3 font-bold">Tumhara saath… mujhe khud se milata hai.</p>
                </div>
                <div className="bg-white p-3 pb-8 shadow-[0_0_15px_rgba(255,165,0,0.4)] transform rotate-1 hover:rotate-0 transition-transform duration-300 w-48 border-2 border-orange-100">
                    <div className="h-40 bg-gray-200 overflow-hidden border border-gray-100 relative">
                        <img src="/memories/usl15.jpeg" alt="Memory 15" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-courier text-center text-orange-800 text-xs mt-3 font-bold">Tumhe paakar aisa lagta hai jaise sab theek ho gaya.</p>
                </div>
            </div>

            {/* === 3. GAME CARD === */}
            <div className="bg-black p-1 rounded-xl border-4 border-orange-500 shadow-[0_0_40px_rgba(255,165,0,0.5)] relative overflow-hidden min-h-[600px] flex flex-col">

                {/* --- AUDIO BUTTON --- */}
                <div className="text-center mt-6 mb-4 relative z-30 shrink-0">
                    <button
                        onClick={toggleAudio}
                        className="px-4 py-2 bg-cinema-sepia text-cinema-cream font-courier font-bold text-xs rounded-full hover:bg-cinema-sepia/80 transition-colors border-2 border-cinema-brass flex items-center justify-center gap-2 mx-auto"
                    >
                        {isPlaying ? '⏸ PAUSE JWM ANTHEM' : '▶ PLAY JWM ANTHEM'}
                    </button>
                </div>

                {/* --- GAMEPLAY AREA --- */}
                <div className="relative w-full flex-1 flex flex-col items-center justify-center p-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">

                    {/* HUD */}
                    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between text-white font-mono text-lg z-10 bg-black/30 backdrop-blur-sm">
                        <div className="text-orange-300">STATION: <span className="text-white">{LEVEL_DATA[level].name}</span></div>
                        <div className={`${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>⏱ {timeLeft}s</div>
                        <div className="text-yellow-400">SCORE: {score}</div>
                    </div>

                    {/* MAIN GAME CONTENT */}
                    <AnimatePresence mode="wait">
                        {gameState === 'PLAYING' && currentCard && (
                            <motion.div
                                key={currentCard.id}
                                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.8, opacity: 0, x: -100 }}
                                className="w-64 h-80 bg-white rounded-xl shadow-2xl flex flex-col items-center p-6 border-4 border-orange-400 relative"
                            >
                                {/* Ticket Design Elements */}
                                <div className="absolute top-4 left-4 w-full h-4 border-t-2 border-dashed border-gray-300"></div>
                                <div className="absolute bottom-4 left-4 w-full h-4 border-b-2 border-dashed border-gray-300"></div>

                                <div className="text-sm font-bold text-gray-400 tracking-widest mb-4">PASSENGER / ITEM</div>
                                <div className="text-8xl mb-4">{currentCard.emoji}</div>
                                <div className="text-2xl font-cinzel font-bold text-center text-gray-800 leading-tight">
                                    {currentCard.name}
                                </div>
                                <div className="mt-auto text-xs text-gray-400 font-courier">Ticket #14022025</div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* FEEDBACK POPUP */}
                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute top-1/3 z-50 bg-black/80 px-6 py-3 rounded-full border border-white"
                            >
                                <p className="text-xl font-bold text-yellow-300 font-courier">{feedback}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* CONTROLS */}
                    {gameState === 'PLAYING' && (
                        <div className="flex gap-8 mt-8 z-10">
                            <button
                                onClick={() => handleChoice('KICK')}
                                className="w-20 h-20 rounded-full bg-red-600 border-4 border-red-800 text-3xl shadow-lg active:scale-95 transition-transform flex items-center justify-center hover:bg-red-500"
                            >
                                ❌
                            </button>
                            <div className="text-white font-courier text-xs mt-2 text-center opacity-50">KICK<br />OFF</div>
                            <button
                                onClick={() => handleChoice('KEEP')}
                                className="w-20 h-20 rounded-full bg-green-600 border-4 border-green-800 text-3xl shadow-lg active:scale-95 transition-transform flex items-center justify-center hover:bg-green-500"
                            >
                                ✅
                            </button>
                        </div>
                    )}

                    {/* START SCREEN */}
                    {gameState === 'START' && (
                        <div className="absolute inset-0 bg-black/90 z-50 flex flex-col items-center justify-center text-center p-8">
                            <h1 className="text-4xl font-cinzel text-orange-500 mb-2">THE LOVE EXPRESS</h1>
                            <p className="text-gray-400 font-courier text-sm mb-6 max-w-sm">
                                You are Geet. The train is leaving! <br />
                                Decide who gets on the train and who gets kicked off.
                            </p>
                            <div className="flex gap-4 mb-8 text-sm text-left bg-gray-900 p-4 rounded border border-orange-900">
                                <div>
                                    <span className="block text-green-400">✅ KEEP</span>
                                    Good vibes, Food, Aditya
                                </div>
                                <div>
                                    <span className="block text-red-400">❌ KICK</span>
                                    Goons, Exes, Bad Vibes
                                </div>
                            </div>
                            <button onClick={startGame} className="btn-brass px-8 py-3 text-lg animate-pulse">
                                BOARD TRAIN
                            </button>
                        </div>
                    )}

                    {/* WIN SCREEN */}
                    {gameState === 'WON' && (
                        <div className="absolute inset-0 bg-orange-900/95 z-50 flex flex-col items-center justify-center text-center p-8">
                            <div className="text-6xl mb-4">👸🏻</div>
                            <h2 className="text-4xl font-cinzel text-yellow-400 mb-4">MAIN APNI FAVORITE HOON!</h2>
                            <p className="font-courier text-white mb-6">You found yourself (and true love)!</p>
                            <p className="text-2xl font-bold text-orange-200">Score: {score}</p>
                        </div>
                    )}

                    {/* LOST SCREEN */}
                    {gameState === 'LOST' && (
                        <div className="absolute inset-0 bg-red-900/95 z-50 flex flex-col items-center justify-center text-center p-8">
                            <h2 className="text-3xl font-cinzel text-white mb-4">TRAIN MISSED! 🚂</h2>
                            <p className="font-courier text-gray-300 mb-6">"Akeli ladki khuli tijori ki tarah hoti hai..."</p>
                            <button onClick={startGame} className="bg-white text-red-900 px-6 py-2 rounded-full font-bold">TRY AGAIN</button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import audioManager from '../utils/audioManager'

export default function Feb12GolgappaClicker({ onComplete }) {
    // --- STATE ---
    const [gameState, setGameState] = useState('START') // START, PLAYING, WON, LOST
    const [level, setLevel] = useState(1) // 1: Delhi, 2: Paris, 3: Amsterdam
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(20)
    const [grid, setGrid] = useState(Array(9).fill(null)) // 3x3 Grid
    const [isPlaying, setIsPlaying] = useState(false)
    const [feedback, setFeedback] = useState(null)

    // --- LEVEL CONFIGURATION (Adjusted for Easier Difficulty) ---
    const LEVELS = {
        // Increased 'speed' (ms) means items stay on screen longer
        1: { name: "DELHI", target: "✈️", avoid: "💍", speed: 1300, goal: 10, msg: "Escape the Wedding!" }, // Slower (Easier)
        2: { name: "PARIS", target: "🤳", avoid: "😢", speed: 1100, goal: 20, msg: "Capture the Joy!" },    // Slower (Easier)
        3: { name: "AMSTERDAM", target: "👑", avoid: "🚫", speed: 900, goal: 35, msg: "Own Your Throne!" }   // Slower (Easier)
    }

    // --- AUDIO SETUP ---
    useEffect(() => {
        audioManager.loadSound('queen-theme', '/audio/queen.mp4', { loop: true, volume: 0.6 })
        return () => { audioManager.stop('queen-theme') }
    }, [])

    const toggleAudio = () => {
        if (isPlaying) { audioManager.pause('queen-theme') } else { audioManager.play('queen-theme') }
        setIsPlaying(!isPlaying)
    }

    // --- GAME LOOP ---
    useEffect(() => {
        if (gameState !== 'PLAYING') return

        // Timer
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleGameOver()
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        // Spawner
        const spawner = setInterval(() => {
            spawnItems()
        }, LEVELS[level].speed)

        return () => {
            clearInterval(timer)
            clearInterval(spawner)
        }
    }, [gameState, level])

    const spawnItems = () => {
        const newGrid = Array(9).fill(null)
        // Pick random spot for Target
        const targetIndex = Math.floor(Math.random() * 9)
        newGrid[targetIndex] = { type: 'TARGET', icon: LEVELS[level].target }

        // Chance to spawn Avoid item (higher chance in later levels)
        if (Math.random() > 0.3) {
            let avoidIndex
            do {
                avoidIndex = Math.floor(Math.random() * 9)
            } while (avoidIndex === targetIndex)
            newGrid[avoidIndex] = { type: 'AVOID', icon: LEVELS[level].avoid }
        }

        setGrid(newGrid)
    }

    const handleItemClick = (index, item) => {
        if (gameState !== 'PLAYING' || !item) return

        if (item.type === 'TARGET') {
            // Good Click
            const newScore = score + 1
            setScore(newScore)
            setFeedback("YES! ✨")

            // Check Level Progression
            if (level === 1 && newScore >= 10) changeLevel(2)
            else if (level === 2 && newScore >= 20) changeLevel(3)
            else if (level === 3 && newScore >= 35) winGame()

            // Clear clicked item immediately
            const newGrid = [...grid]
            newGrid[index] = null
            setGrid(newGrid)
        } else if (item.type === 'AVOID') {
            // Bad Click
            setFeedback("OH NO! 💔")
            setScore(prev => Math.max(0, prev - 2))
        }
    }

    const changeLevel = (newLevel) => {
        setLevel(newLevel)
        setTimeLeft(prev => prev + 15) // Bonus time
        setFeedback(`WELCOME TO ${LEVELS[newLevel].name}!`)
    }

    const handleGameOver = () => {
        setGameState('LOST')
    }

    const winGame = () => {
        setGameState('WON')
        setTimeout(() => onComplete?.(), 3000)
    }

    const startGame = () => {
        setGameState('PLAYING')
        setScore(0)
        setLevel(1)
        setTimeLeft(20)
        setGrid(Array(9).fill(null))
        if (!isPlaying) toggleAudio()
    }

    return (
        <div className="w-full max-w-3xl mx-auto pb-12">

            {/* === 1. HEADER === */}
            <div className="flex justify-between items-center mb-8 border-b border-amber-500/30 pb-4">
                <h2 className="text-amber-500 font-cinzel text-xl tracking-wider hidden md:block">FEB 12: QUEEN</h2>
                <button
                    onClick={onComplete}
                    className="bg-red-600 text-white font-bold px-4 py-2 rounded border-2 border-red-800 hover:bg-red-700 flex items-center gap-2 text-sm shadow-lg transform hover:scale-105 transition-transform"
                >
                    🏠 RETURN TO LOBBY
                </button>
            </div>

            {/* === 2. POLAROIDS === */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-10">
                <div className="bg-white p-3 pb-8 shadow-[0_0_15px_rgba(236,72,153,0.3)] transform -rotate-1 hover:rotate-0 transition-transform duration-300 w-48 border-2 border-pink-100">
                    <div className="h-40 bg-gray-200 overflow-hidden border border-gray-100 relative">
                        <img src="/memories/usl12.jpeg" alt="Memory 12" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-courier text-center text-pink-600 text-xs mt-3 font-bold">Jo log khud se pyaar nahi karte, woh kisi aur se bhi sahi pyaar nahi kar sakte</p>
                </div>
                <div className="bg-white p-3 pb-8 shadow-[0_0_15px_rgba(236,72,153,0.3)] transform rotate-1 hover:rotate-0 transition-transform duration-300 w-48 border-2 border-pink-100">
                    <div className="h-40 bg-gray-200 overflow-hidden border border-gray-100 relative">
                        <img src="/memories/usl20.jpeg" alt="Memory 20" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-courier text-center text-pink-600 text-xs mt-3 font-bold">Mera honeymoon mere saath hai.</p>
                </div>
            </div>

            {/* === 3. GAME CARD === */}
            <div className="bg-black p-1 rounded-xl border-4 border-pink-500 shadow-[0_0_40px_rgba(236,72,153,0.5)] relative overflow-hidden min-h-[600px] flex flex-col">

                {/* --- AUDIO BUTTON --- */}
                <div className="text-center mt-6 mb-4 relative z-30 shrink-0">
                    <button
                        onClick={toggleAudio}
                        className="px-4 py-2 bg-cinema-sepia text-cinema-cream font-courier font-bold text-xs rounded-full hover:bg-cinema-sepia/80 transition-colors border-2 border-cinema-brass flex items-center justify-center gap-2 mx-auto"
                    >
                        {isPlaying ? '⏸ PAUSE QUEEN ANTHEM' : '▶ PLAY QUEEN ANTHEM'}
                    </button>
                </div>

                {/* --- GAMEPLAY AREA --- */}
                <div className="relative w-full flex-1 flex flex-col items-center p-4">

                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-black pointer-events-none"></div>

                    {/* HUD */}
                    <div className="flex justify-between w-full max-w-md mb-6 z-10 text-white font-mono text-lg border-b border-pink-500/30 pb-2">
                        <div className="text-pink-300">
                            LEVEL: <span className="text-white font-bold">{LEVELS[level].name}</span>
                        </div>
                        <div className={`${timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                            ⏱ {timeLeft}s
                        </div>
                        <div className="text-yellow-400">
                            SCORE: {score}/{LEVELS[level].goal}
                        </div>
                    </div>

                    {/* INSTRUCTIONS / MESSAGE */}
                    <div className="h-8 mb-4 z-10 text-center">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={feedback || LEVELS[level].msg}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="font-cinzel text-pink-200 font-bold text-lg"
                            >
                                {feedback || LEVELS[level].msg}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* --- THE GRID --- */}
                    {gameState === 'PLAYING' && (
                        <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-sm w-full z-20">
                            {grid.map((item, index) => (
                                <motion.button
                                    key={index}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleItemClick(index, item)}
                                    className={`
                                        h-24 md:h-28 rounded-xl border-2 flex items-center justify-center text-5xl shadow-lg relative overflow-hidden
                                        ${item ? 'bg-gray-800 border-pink-400 cursor-pointer' : 'bg-gray-900/50 border-gray-700 cursor-default'}
                                    `}
                                >
                                    {item && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="relative z-10"
                                        >
                                            {item.icon}
                                        </motion.span>
                                    )}
                                    {/* Grid Cell Background Effect */}
                                    {item?.type === 'TARGET' && <div className="absolute inset-0 bg-pink-500/20 animate-pulse"></div>}
                                </motion.button>
                            ))}
                        </div>
                    )}

                    {/* --- MENUS --- */}
                    {gameState === 'START' && (
                        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/90 text-center p-6">
                            <h1 className="font-cinzel text-4xl text-pink-500 mb-4 font-bold">RANI'S FREEDOM FLIGHT</h1>
                            <div className="font-courier text-gray-300 text-sm mb-8 space-y-4 max-w-sm">
                                <p>Help Rani find her independence!</p>
                                <ul className="text-left space-y-2 bg-gray-900 p-4 rounded border border-pink-900">
                                    <li>🇮🇳 <strong>Level 1:</strong> Click ✈️ to Escape! (Avoid 💍)</li>
                                    <li>🇫🇷 <strong>Level 2:</strong> Click 🤳 to Party! (Avoid 😢)</li>
                                    <li>🇳🇱 <strong>Level 3:</strong> Click 👑 to Rule! (Avoid 🚫)</li>
                                </ul>
                            </div>
                            <button onClick={startGame} className="btn-brass px-8 py-3 text-lg animate-pulse">
                                START JOURNEY
                            </button>
                        </div>
                    )}

                    {gameState === 'WON' && (
                        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-pink-900/95 text-center p-6">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                                <div className="text-7xl mb-4">👑</div>
                                <h2 className="font-cinzel text-4xl text-yellow-400 mb-2">ABSOLUTE DIVA!</h2>
                                <p className="font-courier text-white mb-6">"Mera sense of humor bohot achha hai, aapko dheere dheere pata chalega!"</p>
                                <p className="text-2xl font-bold text-pink-300">Score: {score}</p>
                            </motion.div>
                        </div>
                    )}

                    {gameState === 'LOST' && (
                        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-red-900/95 text-center p-6">
                            <h2 className="font-cinzel text-3xl text-white mb-4">CAUGHT BY RELATIVES! 😱</h2>
                            <p className="font-courier text-gray-200 mb-6">Don't let the past hold you back.</p>
                            <button onClick={startGame} className="bg-white text-red-900 px-6 py-2 rounded-full font-bold hover:bg-gray-200">
                                TRY AGAIN
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
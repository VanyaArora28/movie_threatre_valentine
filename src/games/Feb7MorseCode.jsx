import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import audioManager from '../utils/audioManager'

const MORSE_CODE = {
    '1': '.----', '5': '.....', '0': '-----',
    '2': '..---', '/': '-..-.'
}

const TARGET_SEQUENCE = '15/10/25'

export default function Feb7MorseCode({ onComplete }) {
    const [userInput, setUserInput] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showHint, setShowHint] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        // CHANGE THIS LINE:
        // FROM: audioManager.loadSound('morse', '/audio/morse-code.mp3', { loop: true })

        // TO YOUR FILE: (Make sure 'loop' is false for voice notes)
        audioManager.loadSound('morse', '/audio/falling_in_love.mp4', { loop: false })

        return () => { audioManager.stop('morse') }
    }, [])

    const toggleAudio = () => {
        if (isPlaying) { audioManager.pause('morse') } else { audioManager.play('morse') }
        setIsPlaying(!isPlaying)
    }

    const addDot = () => { setUserInput(prev => prev + '.'); setError('') }
    const addDash = () => { setUserInput(prev => prev + '-'); setError('') }
    const addSpace = () => { setUserInput(prev => prev + ' '); setError('') }
    const clearInput = () => { setUserInput(''); setError('') }

    const checkAnswer = () => {
        const targetMorse = TARGET_SEQUENCE.split('').map(char => MORSE_CODE[char] || char).join(' ')
        if (userInput.trim() === targetMorse.trim()) {
            setShowSuccess(true)
            audioManager.stop('morse')
            setTimeout(() => { onComplete?.() }, 2000)
        } else {
            setError('INCORRECT SEQUENCE')
            setUserInput('')
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto pb-12">

            {/* === 1. RETURN TO LOBBY BUTTON (Header Bar) === */}
            <div className="flex justify-between items-center mb-8 border-b border-amber-500/30 pb-4">
                <h2 className="text-amber-500 font-cinzel text-xl tracking-wider hidden md:block">FEB 7: FALLING IN LOVE</h2>
                <button
                    onClick={onComplete}
                    className="bg-red-600 text-white font-bold px-4 py-2 rounded border-2 border-red-800 hover:bg-red-700 flex items-center gap-2 text-sm shadow-lg transform hover:scale-105 transition-transform"
                >
                    🏠 RETURN TO LOBBY
                </button>
            </div>

            {/* === 2. POLAROID PHOTOS === */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-10">
                <div className="bg-white p-3 pb-8 shadow-[0_0_15px_rgba(0,0,0,0.5)] transform -rotate-2 hover:rotate-0 transition-transform duration-300 w-48">
                    <div className="h-40 bg-gray-200 overflow-hidden border border-gray-100 relative">
                        {/* MAKE SURE THIS FILENAME MATCHES EXACTLY IN YOUR FOLDER */}
                        <img src="/memories/usl1.jpeg" alt="Memory 1" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-courier text-center text-gray-800 text-xs mt-3 font-bold leading-tight">Lost my heart to you. It wasn't a fall, but a crash</p>
                </div>
                <div className="bg-white p-3 pb-8 shadow-[0_0_15px_rgba(0,0,0,0.5)] transform rotate-2 hover:rotate-0 transition-transform duration-300 w-48">
                    <div className="h-40 bg-gray-200 overflow-hidden border border-gray-100 relative">
                        {/* MAKE SURE THIS FILENAME MATCHES EXACTLY IN YOUR FOLDER */}
                        <img src="/memories/usl2.jpeg" alt="Memory 2" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-courier text-center text-gray-800 text-xs mt-3 font-bold leading-tight">Your voice calls to my heart</p>
                </div>
            </div>

            {/* === 3. GAME CARD === */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="ticket-stub p-6 md:p-8 rounded-lg bg-amber-50 border-4 border-cinema-sepia shadow-2xl relative"
            >
                <h3 className="font-cinzel text-2xl md:text-3xl text-cinema-sepia text-center mb-2">
                    TELEGRAM DECODER
                </h3>

                {/* HINT SECTION */}
                <div className="text-center mb-6">
                    <p className="font-courier text-cinema-sepia text-xs mb-2">Hint: The day we first met (DD/MM/YY)</p>
                    <button
                        onClick={() => setShowHint(!showHint)}
                        className="text-xs bg-amber-200 text-amber-900 px-2 py-1 rounded border border-amber-400 hover:bg-amber-300"
                    >
                        {showHint ? "Hide Hint" : "Need a bigger hint?"}
                    </button>
                    {showHint && (
                        <p className="font-courier text-red-600 font-bold text-sm mt-2 animate-pulse">
                            Try entering: 15/10/25
                        </p>
                    )}
                </div>

                {/* AUDIO CONTROL */}
                <div className="mb-6 text-center">
                    <button onClick={toggleAudio} className="px-6 py-2 bg-cinema-sepia text-cinema-cream font-courier rounded-md hover:bg-opacity-80 w-full md:w-auto text-sm">
                        {isPlaying ? '⏸ PAUSE AUDIO' : '▶ GLIMPSE'}
                    </button>
                </div>

                {/* === MORSE CODE REFERENCE === */}
                <div className="mb-6 p-4 bg-white border-2 border-dashed border-cinema-sepia rounded">
                    <p className="font-courier text-cinema-sepia text-xs text-center mb-2 font-bold uppercase tracking-widest">
                        -- CODE REFERENCE --
                    </p>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2 text-center font-courier text-sm text-cinema-sepia font-bold">
                        <div>0: -----</div>
                        <div>1: .----</div>
                        <div>2: ..---</div>
                        <div>5: .....</div>
                        <div>/: -..-.</div>
                    </div>
                </div>

                {/* INPUT DISPLAY */}
                <div className="mb-4">
                    <div className="min-h-[60px] p-4 bg-white border-4 border-cinema-sepia rounded font-courier text-xl text-cinema-sepia break-all text-center flex items-center justify-center shadow-inner">
                        {userInput || <span className="text-gray-300 text-sm italic">Tap buttons below to start...</span>}
                    </div>
                </div>

                {/* MESSAGES */}
                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-800 font-bold text-center rounded border border-red-400">
                        {error}
                    </div>
                )}
                {showSuccess && (
                    <div className="mb-4 p-4 bg-green-100 border-2 border-green-600 rounded text-center">
                        <p className="font-bold text-green-800 text-xl">✓ DATE DECODED!</p>
                    </div>
                )}

                {/* CONTROLS */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <button onClick={addDot} className="py-6 bg-cinema-gold text-cinema-red font-black text-4xl rounded-lg border-b-8 border-cinema-brass active:border-b-0 active:translate-y-2 transition-all shadow-md">•</button>
                    <button onClick={addDash} className="py-6 bg-cinema-gold text-cinema-red font-black text-4xl rounded-lg border-b-8 border-cinema-brass active:border-b-0 active:translate-y-2 transition-all shadow-md">—</button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <button onClick={addSpace} className="py-3 bg-gray-200 font-bold rounded border-b-4 border-gray-400 active:border-b-0 active:translate-y-1 text-gray-700">SPACE</button>
                    <button onClick={clearInput} className="py-3 bg-red-100 text-red-800 font-bold rounded border-b-4 border-red-300 active:border-b-0 active:translate-y-1">CLEAR</button>
                    <button onClick={checkAnswer} className="py-3 bg-green-600 text-white font-bold rounded border-b-4 border-green-800 active:border-b-0 active:translate-y-1 shadow-lg">SEND</button>
                </div>
            </motion.div>
        </div>
    )
}
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import audioManager from '../utils/audioManager'

export default function Feb11LogicPuzzle({ onComplete }) {
    // --- State ---
    const [level, setLevel] = useState(1) // 1: Briefcase, 2: Interrogation, 3: Verdict
    const [passcode, setPasscode] = useState(['', '', '', ''])
    const [briefcaseUnlocked, setBriefcaseUnlocked] = useState(false)
    const [evidenceFound, setEvidenceFound] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)
    const [shake, setShake] = useState(false)

    // --- Audio Setup ---
    useEffect(() => {
        // Ensure 'murder_on_the_orient_express.mp4' exists in public/audio/
        audioManager.loadSound('mystery-theme', '/audio/murder_on_the_orient_express.mp4', { loop: true, volume: 0.5 })
        return () => { audioManager.stop('mystery-theme') }
    }, [])

    const toggleAudio = () => {
        if (isPlaying) { audioManager.pause('mystery-theme') } else { audioManager.play('mystery-theme') }
        setIsPlaying(!isPlaying)
    }

    // --- LEVEL 1 LOGIC: THE BRIEFCASE ---
    const CORRECT_CODE = ['1', '4', '0', '2'] // Feb 14

    const handleDigitClick = (digit) => {
        const index = passcode.findIndex(d => d === '')
        if (index !== -1) {
            const newPass = [...passcode]
            newPass[index] = digit
            setPasscode(newPass)

            // Auto-check when full
            if (index === 3) {
                checkCode(newPass)
            }
        }
    }

    const clearPasscode = () => setPasscode(['', '', '', ''])

    const checkCode = (finalPass) => {
        if (JSON.stringify(finalPass) === JSON.stringify(CORRECT_CODE)) {
            setTimeout(() => {
                setBriefcaseUnlocked(true)
                setTimeout(() => setLevel(2), 1500)
            }, 500)
        } else {
            setShake(true)
            setTimeout(() => {
                setShake(false)
                setPasscode(['', '', '', ''])
            }, 500)
        }
    }

    // --- LEVEL 2 LOGIC: THE EVIDENCE ---
    const EVIDENCE_ITEMS = [
        { id: 1, name: "Killer Smile", desc: "Causes instant loss of breath.", type: "weapon" },
        { id: 2, name: "Sparkling Eyes", desc: "Hypnotizes the victim.", type: "weapon" },
        { id: 3, name: "Warm Hugs", desc: "Traps the victim in comfort.", type: "weapon" }
    ]

    const collectEvidence = (id) => {
        if (!evidenceFound.includes(id)) {
            setEvidenceFound([...evidenceFound, id])
        }
    }

    // --- RENDER HELPERS ---
    const variants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    }

    return (
        <div className="w-full max-w-3xl mx-auto pb-12">

            {/* === 1. HEADER === */}
            <div className="flex justify-between items-center mb-8 border-b border-amber-500/30 pb-4">
                <h2 className="text-amber-500 font-cinzel text-xl tracking-wider hidden md:block">FEB 11: MURDER ON THE ORIENT EXPRESS</h2>
                <button
                    onClick={onComplete}
                    className="bg-red-600 text-white font-bold px-4 py-2 rounded border-2 border-red-800 hover:bg-red-700 flex items-center gap-2 text-sm shadow-lg transform hover:scale-105 transition-transform"
                >
                    🏠 RETURN TO LOBBY
                </button>
            </div>

            {/* === 2. POLAROIDS === */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-10">
                <div className="bg-white p-3 pb-8 shadow-[0_0_15px_rgba(0,0,0,0.5)] transform -rotate-1 hover:rotate-0 transition-transform duration-300 w-48">
                    <div className="h-40 bg-gray-200 overflow-hidden border border-gray-100 relative">
                        <img src="/memories/usl9.jpeg" alt="Memory 9" className="w-full h-full object-cover grayscale contrast-125" />
                    </div>
                    <p className="font-courier text-center text-gray-800 text-xs mt-3 font-bold">Partners in Crime</p>
                </div>
                <div className="bg-white p-3 pb-8 shadow-[0_0_15px_rgba(0,0,0,0.5)] transform rotate-1 hover:rotate-0 transition-transform duration-300 w-48">
                    <div className="h-40 bg-gray-200 overflow-hidden border border-gray-100 relative">
                        <img src="/memories/usl10.jpeg" alt="Memory 10" className="w-full h-full object-cover grayscale contrast-125" />
                    </div>
                    <p className="font-courier text-center text-gray-800 text-xs mt-3 font-bold">The Mystery Unfolds</p>
                </div>
            </div>

            {/* === 3. GAME CARD === */}
            <div className="bg-gray-900 p-1 rounded-lg border-4 border-cinema-gold shadow-2xl relative overflow-hidden min-h-[500px]">

                {/* --- AUDIO BUTTON (New Style) --- */}
                <div className="text-center mt-6 mb-2 relative z-20">
                    <button
                        onClick={toggleAudio}
                        className="px-4 py-2 bg-cinema-sepia text-cinema-cream font-courier font-bold text-xs rounded-full hover:bg-cinema-sepia/80 transition-colors border-2 border-cinema-brass flex items-center justify-center gap-2 mx-auto"
                    >
                        {isPlaying ? '⏸ PAUSE MYSTERY THEME' : '▶ PLAY MYSTERY THEME'}
                    </button>
                </div>

                <div className="p-6 md:p-8 relative z-10 h-full flex flex-col items-center justify-center">

                    <AnimatePresence mode="wait">

                        {/* --- LEVEL 1: THE BRIEFCASE --- */}
                        {level === 1 && (
                            <motion.div
                                key="level1"
                                variants={variants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="w-full max-w-md text-center"
                            >
                                <h3 className="font-cinzel text-3xl text-cinema-gold mb-2">CASE FILE #1402</h3>
                                <p className="font-courier text-gray-400 mb-8 text-sm">
                                    Detective, the evidence is locked in this briefcase.<br />
                                    <span className="text-cinema-red italic">Hint: The day of love (DDMM)</span>
                                </p>

                                <div className={`bg-gray-800 p-8 rounded-xl border-t-8 border-gray-700 shadow-2xl ${shake ? 'animate-shake' : ''}`}>
                                    {/* Display */}
                                    <div className="bg-black border-2 border-gray-600 p-4 mb-6 rounded flex justify-center gap-4">
                                        {passcode.map((digit, i) => (
                                            <div key={i} className="w-12 h-16 bg-gray-900 border border-gray-700 rounded flex items-center justify-center text-cinema-gold font-mono text-3xl">
                                                {digit || '•'}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Keypad */}
                                    <div className="grid grid-cols-3 gap-3">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                            <button
                                                key={num}
                                                onClick={() => handleDigitClick(String(num))}
                                                className="h-12 bg-gray-700 rounded hover:bg-gray-600 text-white font-bold font-courier active:scale-95 transition-transform"
                                            >
                                                {num}
                                            </button>
                                        ))}
                                        <button onClick={clearPasscode} className="h-12 bg-red-900/50 rounded hover:bg-red-900 text-red-200 font-bold font-courier text-xs">CLR</button>
                                        <button onClick={() => handleDigitClick('0')} className="h-12 bg-gray-700 rounded hover:bg-gray-600 text-white font-bold font-courier active:scale-95">0</button>
                                        <div className="h-12"></div>
                                    </div>

                                    {briefcaseUnlocked && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute inset-0 bg-green-900/90 flex items-center justify-center rounded-xl backdrop-blur-sm"
                                        >
                                            <p className="font-cinzel text-2xl text-white font-bold">ACCESS GRANTED</p>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* --- LEVEL 2: THE EVIDENCE --- */}
                        {level === 2 && (
                            <motion.div
                                key="level2"
                                variants={variants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="w-full text-center"
                            >
                                <h3 className="font-cinzel text-3xl text-cinema-gold mb-2">THE EVIDENCE</h3>
                                <p className="font-courier text-gray-400 mb-6 text-sm">
                                    Identify the weapons used to steal the heart.<br />
                                    Find all 3 clues.
                                </p>

                                <div className="grid grid-cols-1 gap-4">
                                    {EVIDENCE_ITEMS.map((item) => (
                                        <motion.button
                                            key={item.id}
                                            onClick={() => collectEvidence(item.id)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`p-4 border-2 rounded-lg text-left relative overflow-hidden transition-all ${evidenceFound.includes(item.id)
                                                    ? 'bg-cinema-gold/20 border-cinema-gold'
                                                    : 'bg-gray-800 border-gray-600 hover:border-gray-400'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className={`font-cinzel font-bold text-lg ${evidenceFound.includes(item.id) ? 'text-cinema-gold' : 'text-gray-300'}`}>
                                                        {evidenceFound.includes(item.id) ? item.name : "UNKNOWN CLUE #" + item.id}
                                                    </p>
                                                    <p className="font-courier text-xs text-gray-400 mt-1">
                                                        {evidenceFound.includes(item.id) ? item.desc : "Click to analyze..."}
                                                    </p>
                                                </div>
                                                <div className="text-2xl">
                                                    {evidenceFound.includes(item.id) ? '✅' : '🔍'}
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>

                                {evidenceFound.length === 3 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-8"
                                    >
                                        <p className="text-green-400 font-courier text-sm mb-4">All evidence collected. Suspect identified.</p>
                                        <button
                                            onClick={() => setLevel(3)}
                                            className="btn-brass px-8 py-3 animate-pulse"
                                        >
                                            REVEAL THE CULPRIT
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {/* --- LEVEL 3: THE VERDICT --- */}
                        {level === 3 && (
                            <motion.div
                                key="level3"
                                variants={variants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="w-full text-center"
                            >
                                <div className="bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] bg-cinema-red p-8 rounded border-8 border-cinema-gold shadow-[0_0_50px_rgba(0,0,0,0.8)] max-w-sm mx-auto transform rotate-1">
                                    <div className="border-4 border-double border-cinema-gold p-4 mb-4 bg-black/30">
                                        <p className="font-cinzel text-cinema-gold text-4xl font-bold mb-2">GUILTY</p>
                                        <p className="font-courier text-cinema-cream uppercase text-xs tracking-[0.2em]">of First Degree Heart Theft</p>
                                    </div>

                                    <div className="w-48 h-48 mx-auto bg-gray-200 border-4 border-white shadow-lg rotate-[-2deg] mb-6 overflow-hidden relative group">
                                        <img
                                            src="/memories/usl11.jpeg"
                                            alt="The Beautiful Suspect"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <p className="font-playfair text-white italic text-lg mb-6">
                                        "For the crime of stealing my heart completely and irrevocably."
                                    </p>

                                    <button
                                        onClick={onComplete}
                                        className="bg-white text-cinema-red font-bold px-6 py-3 rounded-full hover:bg-gray-100 shadow-xl"
                                    >
                                        CASE CLOSED 💋
                                    </button>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] z-0"></div>
            </div>
        </div>
    )
}
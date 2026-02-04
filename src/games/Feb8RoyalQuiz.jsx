import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import audioManager from '../utils/audioManager' // <--- IMPORT THIS

const QUIZ_QUESTIONS = [
    {
        question: "Law #1: Who is officially entitled to the last french fry?",
        options: ["You", "Me", "We share it", "Whoever grabs it first"],
        correct: 0
    },
    {
        question: "Law #2: Who gets to choose the movie on movie night?",
        options: ["Whoever asks first", "We take turns", "You always", "Rock, paper, scissors"],
        correct: 1
    },
    {
        question: "Law #3: Who is the designated spider remover?",
        options: ["You (the brave one)", "Me (reluctantly)", "We both run away", "We call for backup"],
        correct: 0
    },
    {
        question: "Law #4: Who controls the thermostat?",
        options: ["Whoever is coldest", "Whoever is hottest", "We compromise", "The thermostat controls us"],
        correct: 2
    },
    {
        question: "Law #5: Who gets the comfy spot on the couch?",
        options: ["You", "Me", "We cuddle together", "The cat"],
        correct: 2
    }
]

export default function Feb8RoyalQuiz({ onComplete }) {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [score, setScore] = useState(0)
    const [quizComplete, setQuizComplete] = useState(false)

    // --- NEW: Audio State ---
    const [isPlaying, setIsPlaying] = useState(false)

    // --- NEW: Load Audio on Mount ---
    useEffect(() => {
        // Make sure you have 'christmas-prince.mp3' in public/audio/
        audioManager.loadSound('royal-theme', '/audio/a_christmas_prince.mp4', { loop: true, volume: 0.5 })

        return () => {
            audioManager.stop('royal-theme')
        }
    }, [])

    const toggleAudio = () => {
        if (isPlaying) {
            audioManager.pause('royal-theme')
        } else {
            audioManager.play('royal-theme')
        }
        setIsPlaying(!isPlaying)
    }
    // ------------------------

    const handleAnswer = (index) => {
        setSelectedAnswer(index)
        const correct = index === QUIZ_QUESTIONS[currentQuestion].correct
        setIsCorrect(correct)
        setShowResult(true)

        if (correct) {
            setScore(score + 1)
        }

        setTimeout(() => {
            if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
                setCurrentQuestion(currentQuestion + 1)
                setSelectedAnswer(null)
                setShowResult(false)
            } else {
                setQuizComplete(true)
                setTimeout(() => {
                    onComplete?.()
                }, 2000)
            }
        }, 1500)
    }

    return (
        <div className="w-full max-w-2xl mx-auto pb-12">

            {/* === 1. RETURN TO LOBBY BUTTON === */}
            <div className="flex justify-between items-center mb-8 border-b border-amber-500/30 pb-4">
                <h2 className="text-amber-500 font-cinzel text-xl tracking-wider hidden md:block">FEB 8: A CHRISTMAS PRINCE</h2>
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
                        <img src="/memories/usl3.jpeg" alt="Memory 3" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-courier text-center text-gray-800 text-xs mt-3 font-bold leading-tight">You make me want to be honest...</p>
                </div>
                <div className="bg-white p-3 pb-8 shadow-[0_0_15px_rgba(0,0,0,0.5)] transform rotate-2 hover:rotate-0 transition-transform duration-300 w-48">
                    <div className="h-40 bg-gray-200 overflow-hidden border border-gray-100 relative">
                        <img src="/memories/usl4.jpeg" alt="Memory 4" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-courier text-center text-gray-800 text-xs mt-3 font-bold leading-tight">I don’t care about titles or crowns. I care about you...</p>
                </div>
            </div>

            {/* === 3. GAME CARD === */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="gold-filigree bg-gradient-to-b from-cinema-velvet to-cinema-red p-8 rounded-lg border-4 border-cinema-gold shadow-2xl"
            >
                <div className="text-center mb-6">
                    <h3 className="font-cinzel text-4xl text-cinema-gold mb-2 drop-shadow-md">
                        ROYAL DECREES
                    </h3>
                    <p className="font-playfair text-cinema-cream text-lg italic opacity-80 mb-4">
                        Establishing the Laws of Our Kingdom
                    </p>

                    {/* --- NEW: Audio Control Button --- */}
                    <button
                        onClick={toggleAudio}
                        className="px-4 py-2 bg-cinema-gold text-cinema-red font-courier font-bold text-sm rounded-full hover:bg-white transition-colors mb-4 border-2 border-cinema-brass flex items-center justify-center gap-2 mx-auto"
                    >
                        {isPlaying ? '⏸ PAUSE MOVIE THEME' : '▶ PLAY MOVIE THEME'}
                    </button>
                    {/* ---------------------------------- */}

                    {/* Progress Dots */}
                    <div className="mt-4 flex justify-center gap-2">
                        {QUIZ_QUESTIONS.map((_, index) => (
                            <div
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index < currentQuestion ? 'bg-cinema-gold' :
                                    index === currentQuestion ? 'bg-cinema-brass scale-125' :
                                        'bg-red-900/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {!quizComplete ? (
                        <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Question */}
                            <div className="mb-6 p-6 bg-cinema-cream/10 rounded-lg border-2 border-cinema-gold/30 backdrop-blur-sm">
                                <p className="font-cinzel text-cinema-gold text-xl text-center leading-relaxed">
                                    {QUIZ_QUESTIONS[currentQuestion].question}
                                </p>
                            </div>

                            {/* Options */}
                            <div className="space-y-3">
                                {QUIZ_QUESTIONS[currentQuestion].options.map((option, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => !showResult && handleAnswer(index)}
                                        disabled={showResult}
                                        className={`
                      w-full p-4 rounded-lg font-courier text-left transition-all border-2
                      ${showResult && index === QUIZ_QUESTIONS[currentQuestion].correct
                                                ? 'bg-green-600 text-white border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                                                : showResult && index === selectedAnswer && !isCorrect
                                                    ? 'bg-red-600 text-white border-red-400'
                                                    : 'bg-black/40 text-cinema-cream border-cinema-gold/50 hover:bg-cinema-gold hover:text-red-900 hover:border-cinema-gold'
                                            }
                      ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                                        whileHover={!showResult ? { scale: 1.02, x: 5 } : {}}
                                        whileTap={!showResult ? { scale: 0.98 } : {}}
                                    >
                                        <span className="font-bold mr-3 opacity-70">{String.fromCharCode(65 + index)}.</span>
                                        {option}
                                        {showResult && index === QUIZ_QUESTIONS[currentQuestion].correct && ' 👑'}
                                        {showResult && index === selectedAnswer && !isCorrect && ' ❌'}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="mb-6">
                                <div className="text-8xl mb-4 animate-bounce">👑</div>
                                <h4 className="font-cinzel text-4xl text-cinema-gold mb-4">
                                    LAWS ESTABLISHED!
                                </h4>
                                <p className="font-playfair text-cinema-cream text-2xl mb-2">
                                    Score: {score}/{QUIZ_QUESTIONS.length}
                                </p>
                                <p className="font-courier text-cinema-cream text-sm">
                                    The kingdom is now governed by our royal decrees!
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
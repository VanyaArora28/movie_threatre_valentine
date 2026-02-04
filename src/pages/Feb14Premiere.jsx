import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import VinylPlayer from '../components/VinylPlayer'
import audioManager from '../utils/audioManager'

// --- CONFIG: ADD YOUR MEMORY PHOTOS HERE ---
const MEMORY_IMAGES = [
    "/memories/usl16.jpeg", "/memories/usl17.jpeg", "/memories/usl18.jpeg",
    "/memories/usl19.jpeg", "/memories/usl20.jpeg", "/memories/usl21.jpeg",
    "/memories/usl22.jpeg", "/memories/usl23.jpeg", "/memories/usl24.jpeg",
    "/memories/usl25.jpeg", "/memories/usl26.jpeg", "/memories/usl15.jpeg"
]

export default function Feb14Premiere() {
    const [curtainsOpen, setCurtainsOpen] = useState(false)
    const [isPlayingVoice, setIsPlayingVoice] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        // Open curtains after a moment
        setTimeout(() => {
            setCurtainsOpen(true)
        }, 1000)

        // Voice Note Loader
        audioManager.loadSound('final-voice-note', '/audio/voice_note.mp4', { loop: false, volume: 1.0 })
        return () => { audioManager.stop('final-voice-note') }
    }, [])

    const handleClose = () => {
        navigate('/lobby')
    }

    const toggleVoiceNote = () => {
        if (isPlayingVoice) {
            audioManager.pause('final-voice-note')
        } else {
            audioManager.play('final-voice-note')
        }
        setIsPlayingVoice(!isPlayingVoice)
    }

    return (
        <div className="fixed inset-0 z-50 bg-black overflow-hidden">
            {/* --- CURTAINS ANIMATION --- */}
            <AnimatePresence>
                {!curtainsOpen && (
                    <>
                        <motion.div
                            initial={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 2.5, ease: 'easeInOut' }}
                            className="fixed top-0 left-0 w-1/2 h-full bg-red-900 border-r-8 border-yellow-600 z-50 shadow-2xl"
                        />
                        <motion.div
                            initial={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 2.5, ease: 'easeInOut' }}
                            className="fixed top-0 right-0 w-1/2 h-full bg-red-900 border-l-8 border-yellow-600 z-50 shadow-2xl"
                        />
                        <motion.div
                            initial={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                        >
                            <div className="w-40 h-40 rounded-full bg-yellow-600 flex items-center justify-center border-8 border-yellow-300 shadow-[0_0_50px_rgba(255,215,0,0.5)]">
                                <span className="font-cinzel text-5xl text-red-900 font-black">14</span>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* --- MAIN SCROLLABLE CONTENT --- */}
            <div className="absolute inset-0 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] bg-black">

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="fixed top-4 right-4 z-40 w-12 h-12 bg-red-600 border-2 border-yellow-500 rounded-full text-white font-bold hover:bg-red-700 shadow-lg"
                >
                    ✕
                </button>

                <div className="max-w-4xl mx-auto py-16 px-4 space-y-24">

                    {/* 1. HEADER */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: curtainsOpen ? 1 : 0, y: curtainsOpen ? 0 : 50 }}
                        transition={{ duration: 1, delay: 2 }}
                        className="text-center"
                    >
                        <h1 className="font-cinzel text-5xl md:text-7xl text-yellow-500 text-shadow-glow mb-4">
                            THE GRAND PREMIERE
                        </h1>
                        <div className="h-1 w-32 bg-yellow-600 mx-auto"></div>
                        <p className="font-playfair text-xl text-gray-400 mt-4 italic">Starring Us</p>
                    </motion.div>

                    {/* 2. VINYL PLAYER */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: curtainsOpen ? 1 : 0 }}
                        transition={{ duration: 1, delay: 2.5 }}
                    >
                        <VinylPlayer />
                    </motion.div>

                    {/* 3. SPOTIFY PLAYLIST */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: curtainsOpen ? 1 : 0 }}
                        transition={{ duration: 1, delay: 2.8 }}
                        className="border-4 border-yellow-600/50 rounded-xl p-6 bg-black/50"
                    >
                        <h2 className="font-cinzel text-2xl text-yellow-500 text-center mb-6">OFFICIAL SOUNDTRACK</h2>

                        {/* REPLACE THE 'src' BELOW WITH YOUR SPOTIFY EMBED LINK */}
                        {/* To get link: Spotify App -> Playlist -> Share -> Embed -> Copy the 'src' part only */}
                        <iframe
                            style={{ borderRadius: '12px' }}
                            src="https://open.spotify.com/embed/playlist/4J6LNsJlGjGgeiTzbXlT4z?utm_source=generator"
                            width="100%"
                            height="152"
                            frameBorder="0"
                            allowFullScreen=""
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                    </motion.div>

                    {/* 4. INFINITE FILMSTRIP GALLERY */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: curtainsOpen ? 1 : 0 }}
                        transition={{ duration: 1, delay: 3.1 }}
                        className="relative"
                    >
                        <h2 className="font-cinzel text-3xl text-yellow-500 text-center mb-8">FRAMES OF LOVE</h2>

                        {/* Filmstrip Borders */}
                        <div className="absolute top-0 left-0 right-0 h-8 bg-black border-y-2 border-yellow-600 z-10 flex justify-between px-2 overflow-hidden">
                            {[...Array(40)].map((_, i) => <div key={i} className="w-4 h-full border-r border-gray-800"></div>)}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-black border-y-2 border-yellow-600 z-10 flex justify-between px-2 overflow-hidden">
                            {[...Array(40)].map((_, i) => <div key={i} className="w-4 h-full border-r border-gray-800"></div>)}
                        </div>

                        {/* Scrolling Container */}
                        <div className="py-12 bg-gray-900 overflow-hidden flex relative">
                            <motion.div
                                className="flex gap-4 px-4"
                                animate={{ x: ["0%", "-50%"] }} // Scroll halfway then reset (infinite loop)
                                transition={{
                                    repeat: Infinity,
                                    ease: "linear",
                                    duration: 20 // Adjust speed here (higher = slower)
                                }}
                                style={{ width: "fit-content" }}
                            >
                                {/* We render the images TWICE to create a seamless loop */}
                                {[...MEMORY_IMAGES, ...MEMORY_IMAGES].map((img, index) => (
                                    <div
                                        key={index}
                                        className="w-64 h-48 flex-shrink-0 border-4 border-white bg-black shadow-lg transform hover:scale-105 transition-transform"
                                    >
                                        <img src={img} alt="Memory" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* 5. VOICE NOTE */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: curtainsOpen ? 1 : 0 }}
                        transition={{ duration: 1, delay: 3.4 }}
                        className="max-w-md mx-auto"
                    >
                        <div className="bg-amber-100 p-6 rounded-lg border-4 border-amber-800 shadow-xl relative">
                            {/* Tape Decoration */}
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/20 rotate-1 backdrop-blur-sm"></div>

                            <h3 className="font-courier text-amber-900 font-bold text-center mb-4 text-xl">
                                🎙️ A NOTE FOR YOU
                            </h3>

                            <div className="flex items-center justify-center gap-4">
                                <button
                                    onClick={toggleVoiceNote}
                                    className="w-16 h-16 rounded-full bg-red-600 border-4 border-red-800 flex items-center justify-center text-white text-2xl shadow-inner active:scale-95 transition-transform"
                                >
                                    {isPlayingVoice ? '❚❚' : '▶'}
                                </button>
                                <div className="h-1 flex-1 bg-amber-900/20 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-red-600"
                                        animate={{ width: isPlayingVoice ? "100%" : "0%" }}
                                        transition={{ duration: isPlayingVoice ? 30 : 0, ease: "linear" }} // Approx voice note length
                                    />
                                </div>
                            </div>
                            <p className="font-courier text-xs text-center text-amber-800 mt-4 opacity-70">
                                Recorded: Feb 14, 2026
                            </p>
                        </div>
                    </motion.div>

                    {/* 6. FINAL QUOTE */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: curtainsOpen ? 1 : 0, scale: 1 }}
                        transition={{ duration: 1.5, delay: 4 }}
                        className="text-center py-12 pb-32"
                    >
                        <div className="inline-block p-8 border-y-4 border-yellow-600 bg-black/50 backdrop-blur-sm">
                            <p className="font-playfair text-white text-2xl md:text-4xl italic leading-relaxed">
                                "Happy ending? <br />
                                <span className="text-yellow-500 font-bold not-italic font-cinzel text-3xl md:text-5xl block mt-4">
                                    Nah, when it comes to us,<br />there is no ending!
                                </span>"
                            </p>
                        </div>
                        <p className="font-courier text-gray-500 mt-8 text-xs tracking-widest">
                            TO BE CONTINUED...
                        </p>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}
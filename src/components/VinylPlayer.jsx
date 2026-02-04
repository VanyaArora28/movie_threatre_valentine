import { useState } from 'react'
import { motion } from 'framer-motion'
import audioManager from '../utils/audioManager'

export default function VinylPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)

    const handlePlay = () => {
        if (!hasStarted) {
            // Load and play the song
            audioManager.loadSound('valentine-song', '/audio/dooron_dooron.mp4', {
                loop: true,
                volume: 0.7
            })
            setHasStarted(true)
        }

        if (isPlaying) {
            audioManager.pause('valentine-song')
            setIsPlaying(false)
        } else {
            audioManager.play('valentine-song')
            setIsPlaying(true)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
                className="bg-gradient-to-b from-amber-900 to-amber-950 p-8 rounded-lg border-8 border-cinema-brass shadow-2xl"
            >
                <h3 className="font-cinzel text-2xl text-cinema-gold text-center mb-6">
                    OUR SOUNDTRACK
                </h3>

                {/* Record Player */}
                <div className="relative">
                    {/* Vinyl Record */}
                    <motion.div
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{
                            duration: 3,
                            repeat: isPlaying ? Infinity : 0,
                            ease: 'linear'
                        }}
                        className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-black via-gray-900 to-black border-8 border-cinema-gold relative shadow-2xl"
                    >
                        {/* Record grooves */}
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute inset-0 rounded-full border border-gray-700"
                                style={{
                                    margin: `${i * 8 + 20}px`,
                                }}
                            />
                        ))}

                        {/* Center Label */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-cinema-gold flex items-center justify-center">
                            <div className="text-center">
                                <p className="font-cinzel text-cinema-red text-xs font-bold">
                                    VALENTINE'S
                                </p>
                                <p className="font-courier text-cinema-red text-[8px] mt-1">
                                    PLACEHOLDER SONG
                                </p>
                                <p className="text-2xl mt-1">❤️</p>
                            </div>
                        </div>

                        {/* Center Hole */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black" />
                    </motion.div>

                    {/* Tonearm */}
                    <motion.div
                        animate={{
                            rotate: isPlaying ? 25 : 0,
                            x: isPlaying ? 40 : 0,
                        }}
                        transition={{ duration: 0.8 }}
                        className="absolute top-8 right-4 origin-top-right"
                    >
                        <div className="w-2 h-32 bg-gradient-to-b from-cinema-brass to-cinema-gold rounded-full shadow-lg" />
                        <div className="w-4 h-4 bg-cinema-gold rounded-full -mt-1 ml-[-4px]" />
                    </motion.div>
                </div>

                {/* Controls */}
                <div className="mt-8 text-center">
                    <button
                        onClick={handlePlay}
                        className="btn-brass"
                    >
                        {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
                    </button>

                    <p className="font-courier text-cinema-cream text-xs mt-4">
                        {isPlaying ? '♪ Now Playing...' : 'Click to play our song'}
                    </p>
                </div>

                {/* Placeholder Note */}
                <div className="mt-6 p-3 bg-yellow-100 border-2 border-yellow-600 rounded text-center">
                    <p className="font-courier text-yellow-900 text-xs">
                        💫 I will always adore you from afar<br />
                        <code className="text-[10px]">like a distant star💫</code>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

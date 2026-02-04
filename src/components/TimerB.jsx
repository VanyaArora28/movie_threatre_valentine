import { useState, useEffect } from 'react'
import { calculateCountdown, padZero } from '../utils/dateHelpers'
import { motion } from 'framer-motion'

export default function TimerB() {
    const [countdown, setCountdown] = useState(calculateCountdown())

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(calculateCountdown())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="w-full max-w-4xl mx-auto mb-12"
        >
            <div className="bg-gradient-to-b from-cinema-velvet to-cinema-red border-8 border-cinema-gold rounded-lg p-6 shadow-2xl">
                {/* Header */}
                <div className="text-center mb-4">
                    <motion.h3
                        className="font-cinzel text-cinema-gold text-2xl md:text-3xl font-bold mb-2"
                        animate={{
                            textShadow: [
                                '0 0 10px rgba(255, 215, 0, 0.5)',
                                '0 0 20px rgba(255, 215, 0, 0.8)',
                                '0 0 10px rgba(255, 215, 0, 0.5)',
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        NEXT SHOW BEGINS IN...
                    </motion.h3>
                    <p className="font-courier text-cinema-cream text-sm md:text-base">
                        Valentine's Day Countdown
                    </p>
                    <div className="mt-2 h-1 w-3/4 mx-auto bg-gradient-to-r from-transparent via-cinema-gold to-transparent" />
                </div>

                {/* Countdown Display */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {/* Days */}
                    <div className="flex flex-col items-center">
                        <div className="bg-black border-4 border-cinema-brass rounded-lg p-4 md:p-6 w-full shadow-lg">
                            <motion.div
                                key={countdown.days}
                                initial={{ rotateX: -90, opacity: 0 }}
                                animate={{ rotateX: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="font-courier text-4xl md:text-6xl text-cinema-gold text-center font-bold tabular-nums"
                            >
                                {padZero(countdown.days)}
                            </motion.div>
                        </div>
                        <span className="font-cinzel text-cinema-gold text-sm md:text-base mt-3 uppercase font-bold">
                            Days
                        </span>
                    </div>

                    {/* Hours */}
                    <div className="flex flex-col items-center">
                        <div className="bg-black border-4 border-cinema-brass rounded-lg p-4 md:p-6 w-full shadow-lg">
                            <motion.div
                                key={countdown.hours}
                                initial={{ rotateX: -90, opacity: 0 }}
                                animate={{ rotateX: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="font-courier text-4xl md:text-6xl text-cinema-gold text-center font-bold tabular-nums"
                            >
                                {padZero(countdown.hours)}
                            </motion.div>
                        </div>
                        <span className="font-cinzel text-cinema-gold text-sm md:text-base mt-3 uppercase font-bold">
                            Hours
                        </span>
                    </div>

                    {/* Minutes */}
                    <div className="flex flex-col items-center">
                        <div className="bg-black border-4 border-cinema-brass rounded-lg p-4 md:p-6 w-full shadow-lg">
                            <motion.div
                                key={countdown.minutes}
                                initial={{ rotateX: -90, opacity: 0 }}
                                animate={{ rotateX: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="font-courier text-4xl md:text-6xl text-cinema-gold text-center font-bold tabular-nums"
                            >
                                {padZero(countdown.minutes)}
                            </motion.div>
                        </div>
                        <span className="font-cinzel text-cinema-gold text-sm md:text-base mt-3 uppercase font-bold">
                            Minutes
                        </span>
                    </div>

                    {/* Seconds */}
                    <div className="flex flex-col items-center">
                        <div className="bg-black border-4 border-cinema-brass rounded-lg p-4 md:p-6 w-full shadow-lg">
                            <motion.div
                                key={countdown.seconds}
                                initial={{ rotateX: -90, opacity: 0 }}
                                animate={{ rotateX: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="font-courier text-4xl md:text-6xl text-cinema-gold text-center font-bold tabular-nums"
                            >
                                {padZero(countdown.seconds)}
                            </motion.div>
                        </div>
                        <span className="font-cinzel text-cinema-gold text-sm md:text-base mt-3 uppercase font-bold">
                            Seconds
                        </span>
                    </div>
                </div>

                {/* Decorative Hearts */}
                <div className="flex justify-center items-center gap-3 mt-6">
                    <motion.span
                        className="text-3xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        ❤️
                    </motion.span>
                    <motion.span
                        className="text-3xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                    >
                        ❤️
                    </motion.span>
                    <motion.span
                        className="text-3xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                    >
                        ❤️
                    </motion.span>
                </div>
            </div>
        </motion.div>
    )
}

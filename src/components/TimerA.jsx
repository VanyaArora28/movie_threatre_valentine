import { useState, useEffect } from 'react'
import { calculateRuntime, padZero } from '../utils/dateHelpers'
import { motion } from 'framer-motion'

export default function TimerA() {
    const [runtime, setRuntime] = useState(calculateRuntime())

    useEffect(() => {
        const interval = setInterval(() => {
            setRuntime(calculateRuntime())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full max-w-4xl mx-auto mb-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-black border-8 border-cinema-brass rounded-lg p-6 shadow-2xl"
            >
                {/* Projector Display Header */}
                <div className="text-center mb-4">
                    <h3 className="font-cinzel text-cinema-gold text-2xl md:text-3xl font-bold mb-2">
                        TOTAL RUNTIME
                    </h3>
                    <p className="font-courier text-cinema-cream text-sm md:text-base">
                        How Long We Have Been Sitting Together
                    </p>
                    <div className="mt-2 h-1 w-3/4 mx-auto bg-gradient-to-r from-transparent via-cinema-gold to-transparent" />
                </div>

                {/* Timer Display */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
                    {/* Years */}
                    <div className="flex flex-col items-center">
                        <div className="bg-cinema-red border-4 border-cinema-gold rounded-lg p-3 md:p-4 w-full">
                            <div className="font-courier text-3xl md:text-5xl text-cinema-gold text-center font-bold tabular-nums">
                                {padZero(runtime.years)}
                            </div>
                        </div>
                        <span className="font-cinzel text-cinema-brass text-xs md:text-sm mt-2 uppercase">
                            Years
                        </span>
                    </div>

                    {/* Months */}
                    <div className="flex flex-col items-center">
                        <div className="bg-cinema-red border-4 border-cinema-gold rounded-lg p-3 md:p-4 w-full">
                            <div className="font-courier text-3xl md:text-5xl text-cinema-gold text-center font-bold tabular-nums">
                                {padZero(runtime.months)}
                            </div>
                        </div>
                        <span className="font-cinzel text-cinema-brass text-xs md:text-sm mt-2 uppercase">
                            Months
                        </span>
                    </div>

                    {/* Days */}
                    <div className="flex flex-col items-center">
                        <div className="bg-cinema-red border-4 border-cinema-gold rounded-lg p-3 md:p-4 w-full">
                            <div className="font-courier text-3xl md:text-5xl text-cinema-gold text-center font-bold tabular-nums">
                                {padZero(runtime.days)}
                            </div>
                        </div>
                        <span className="font-cinzel text-cinema-brass text-xs md:text-sm mt-2 uppercase">
                            Days
                        </span>
                    </div>

                    {/* Hours */}
                    <div className="flex flex-col items-center">
                        <div className="bg-cinema-red border-4 border-cinema-gold rounded-lg p-3 md:p-4 w-full">
                            <div className="font-courier text-3xl md:text-5xl text-cinema-gold text-center font-bold tabular-nums">
                                {padZero(runtime.hours)}
                            </div>
                        </div>
                        <span className="font-cinzel text-cinema-brass text-xs md:text-sm mt-2 uppercase">
                            Hours
                        </span>
                    </div>

                    {/* Minutes */}
                    <div className="flex flex-col items-center">
                        <div className="bg-cinema-red border-4 border-cinema-gold rounded-lg p-3 md:p-4 w-full">
                            <div className="font-courier text-3xl md:text-5xl text-cinema-gold text-center font-bold tabular-nums">
                                {padZero(runtime.minutes)}
                            </div>
                        </div>
                        <span className="font-cinzel text-cinema-brass text-xs md:text-sm mt-2 uppercase">
                            Minutes
                        </span>
                    </div>

                    {/* Seconds */}
                    <div className="flex flex-col items-center">
                        <div className="bg-cinema-red border-4 border-cinema-gold rounded-lg p-3 md:p-4 w-full">
                            <motion.div
                                key={runtime.seconds}
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className="font-courier text-3xl md:text-5xl text-cinema-gold text-center font-bold tabular-nums"
                            >
                                {padZero(runtime.seconds)}
                            </motion.div>
                        </div>
                        <span className="font-cinzel text-cinema-brass text-xs md:text-sm mt-2 uppercase">
                            Seconds
                        </span>
                    </div>
                </div>

                {/* Decorative Film Reel Icons */}
                <div className="flex justify-center items-center gap-4 mt-6">
                    <div className="w-8 h-8 rounded-full border-4 border-cinema-gold bg-cinema-red" />
                    <div className="h-px w-16 bg-cinema-gold" />
                    <div className="w-8 h-8 rounded-full border-4 border-cinema-gold bg-cinema-red animate-reel-spin" />
                    <div className="h-px w-16 bg-cinema-gold" />
                    <div className="w-8 h-8 rounded-full border-4 border-cinema-gold bg-cinema-red" />
                </div>
            </motion.div>
        </div>
    )
}

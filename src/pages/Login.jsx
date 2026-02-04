import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Login() {
    const [passcode, setPasscode] = useState('')
    const [error, setError] = useState('')
    const [isValidated, setIsValidated] = useState(false)
    const navigate = useNavigate()

    const CORRECT_PASSCODE = '01/12/25'

    const handleSubmit = (e) => {
        e.preventDefault()

        if (passcode === CORRECT_PASSCODE) {
            setError('')
            setIsValidated(true)
            // Navigate after animation completes
            setTimeout(() => {
                navigate('/lobby')
            }, 2500)
        } else {
            setError('INVALID TICKET CODE')
            setPasscode('')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ornate Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-cinema-red via-cinema-velvet to-black opacity-90" />

            {/* Decorative Gold Borders */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-cinema-gold to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-cinema-gold to-transparent" />

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 max-w-2xl w-full"
            >
                {/* Ticket Counter Sign */}
                <div className="text-center mb-12">
                    <motion.h1
                        className="font-cinzel font-black text-6xl md:text-8xl text-cinema-gold mb-4"
                        style={{
                            textShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4), 4px 4px 8px rgba(0, 0, 0, 0.9)'
                        }}
                        animate={{
                            textShadow: [
                                '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4), 4px 4px 8px rgba(0, 0, 0, 0.9)',
                                '0 0 30px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 215, 0, 0.6), 4px 4px 8px rgba(0, 0, 0, 0.9)',
                                '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4), 4px 4px 8px rgba(0, 0, 0, 0.9)',
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        TALKIES
                    </motion.h1>
                    <p className="font-playfair text-2xl text-cinema-cream italic">
                        Cinema Hall
                    </p>
                </div>

                {/* HOUSEFULL/NOW SHOWING Sign */}
                <div className="mb-8 perspective-1000">
                    <AnimatePresence mode="wait">
                        {!isValidated ? (
                            <motion.div
                                key="housefull"
                                initial={{ rotateX: 0 }}
                                exit={{ rotateX: 90 }}
                                transition={{ duration: 0.6 }}
                                className="gold-filigree bg-cinema-red p-6 text-center"
                            >
                                <h2 className="font-cinzel font-black text-5xl text-cinema-gold">
                                    HOUSEFULL
                                </h2>
                                <p className="font-courier text-cinema-cream mt-2">
                                    Ticket Required for Entry
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="nowshowing"
                                initial={{ rotateX: -90 }}
                                animate={{ rotateX: 0 }}
                                transition={{ duration: 0.6 }}
                                className="gold-filigree bg-gradient-to-r from-cinema-gold to-cinema-brass p-6 text-center"
                            >
                                <h2 className="font-cinzel font-black text-5xl text-cinema-red">
                                    NOW SHOWING
                                </h2>
                                <p className="font-courier text-cinema-red mt-2">
                                    Gates Opening...
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Ticket Puncher Input */}
                <AnimatePresence>
                    {!isValidated && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                        >
                            <form onSubmit={handleSubmit} className="ticket-stub p-8 rounded-lg shadow-2xl">
                                <div className="text-center mb-6">
                                    <h3 className="font-cinzel text-2xl text-cinema-sepia mb-2">
                                        TICKET COUNTER
                                    </h3>
                                    <div className="h-px bg-cinema-sepia w-3/4 mx-auto mb-4" />
                                    <p className="font-courier text-sm text-cinema-sepia">
                                        Enter Your Ticket Code
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <input
                                        type="text"
                                        value={passcode}
                                        onChange={(e) => setPasscode(e.target.value)}
                                        placeholder="DD/MM/YY"
                                        className="w-full px-6 py-4 font-courier text-2xl text-center bg-white border-4 border-cinema-sepia text-cinema-sepia rounded-md focus:outline-none focus:border-cinema-gold transition-colors"
                                        maxLength={8}
                                        autoFocus
                                    />
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-4 p-3 bg-red-900 border-2 border-red-600 rounded text-center"
                                    >
                                        <p className="font-courier text-cinema-cream font-bold">
                                            {error}
                                        </p>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full btn-brass"
                                >
                                    PUNCH TICKET
                                </button>

                                <div className="mt-6 text-center">
                                    <p className="font-courier text-xs text-cinema-sepia">
                                        ADMIT ONE • SPECIAL SCREENING
                                    </p>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Gate Opening Animation */}
                <AnimatePresence>
                    {isValidated && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="fixed inset-0 z-50 flex"
                        >
                            {/* Left Gate */}
                            <motion.div
                                initial={{ x: 0 }}
                                animate={{ x: '-100%' }}
                                transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
                                className="w-1/2 h-full velvet-curtain border-r-4 border-cinema-gold"
                            />

                            {/* Right Gate */}
                            <motion.div
                                initial={{ x: 0 }}
                                animate={{ x: '100%' }}
                                transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
                                className="w-1/2 h-full velvet-curtain border-l-4 border-cinema-gold"
                            />

                            {/* Center Ornament */}
                            <motion.div
                                initial={{ opacity: 1, scale: 1 }}
                                animate={{ opacity: 0, scale: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            >
                                <div className="w-32 h-32 rounded-full bg-cinema-gold flex items-center justify-center border-8 border-cinema-brass shadow-2xl">
                                    <span className="font-cinzel text-4xl text-cinema-red font-black">
                                        ❤
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

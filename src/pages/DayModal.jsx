import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getMovieByDay } from '../data/moviesData'
import Feb7MorseCode from '../games/Feb7MorseCode'
import Feb8RoyalQuiz from '../games/Feb8RoyalQuiz'
import Feb9ScratchOff from '../games/Feb9ScratchOff'
import Feb10GelatoBuilder from '../games/Feb10GelatoBuilder'
import Feb11LogicPuzzle from '../games/Feb11LogicPuzzle'
import Feb12GolgappaClicker from '../games/Feb12GolgappaClicker'
import Feb13TrainRunner from '../games/Feb13TrainRunner'

const GAME_COMPONENTS = {
    'morse-code': Feb7MorseCode,
    'royal-quiz': Feb8RoyalQuiz,
    'scratch-off': Feb9ScratchOff,
    'gelato-builder': Feb10GelatoBuilder,
    'logic-puzzle': Feb11LogicPuzzle,
    'golgappa-clicker': Feb12GolgappaClicker,
    'train-runner': Feb13TrainRunner,
}

export default function DayModal() {
    const { day } = useParams()
    const navigate = useNavigate()
    const dayNumber = parseInt(day)
    const movie = getMovieByDay(dayNumber)

    if (!movie) {
        navigate('/lobby')
        return null
    }

    // Redirect to special Feb 14 page
    if (dayNumber === 14) {
        navigate('/premiere')
        return null
    }

    const GameComponent = GAME_COMPONENTS[movie.gameType]

    const handleClose = () => {
        navigate('/lobby')
    }

    const handleGameComplete = () => {
        // Could save completion status to localStorage here
        localStorage.setItem(`day${dayNumber}Completed`, 'true')
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 w-12 h-12 bg-cinema-red border-4 border-cinema-gold rounded-full flex items-center justify-center text-cinema-gold text-2xl font-bold hover:bg-cinema-velvet transition-all"
                >
                    ×
                </button>

                {/* Screening Room */}
                <div className="velvet-curtain p-8 rounded-lg">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.h2
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="font-cinzel text-4xl md:text-5xl text-cinema-gold font-bold mb-2"
                        >
                            {movie.title}
                        </motion.h2>
                        <p className="font-courier text-cinema-cream text-lg">
                            {movie.date} • Private Screening
                        </p>
                        <div className="mt-4 h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-cinema-gold to-transparent" />
                    </div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {/* Movie Poster */}
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="gold-filigree rounded-lg overflow-hidden"
                        >
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Personal Photos */}
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="gold-filigree rounded-lg overflow-hidden bg-gradient-to-b from-cinema-red to-black flex items-center justify-center"
                        >
                            <div className="text-center p-4">
                                <div className="text-6xl mb-2">📸</div>
                                <p className="font-courier text-cinema-cream text-sm">
                                    PLACEHOLDER PHOTO 1
                                </p>
                                <p className="font-courier text-cinema-brass text-xs mt-1">
                                    {movie.photos[0]}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="gold-filigree rounded-lg overflow-hidden bg-gradient-to-b from-cinema-red to-black flex items-center justify-center"
                        >
                            <div className="text-center p-4">
                                <div className="text-6xl mb-2">📸</div>
                                <p className="font-courier text-cinema-cream text-sm">
                                    PLACEHOLDER PHOTO 2
                                </p>
                                <p className="font-courier text-cinema-brass text-xs mt-1">
                                    {movie.photos[1]}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Game Section */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="text-center mb-6">
                            <h3 className="font-cinzel text-2xl text-cinema-gold mb-2">
                                INTERACTIVE EXPERIENCE
                            </h3>
                            <div className="h-px w-32 mx-auto bg-cinema-gold" />
                        </div>

                        {GameComponent && <GameComponent onComplete={handleGameComplete} />}
                    </motion.div>

                    {/* Decorative Film Strip */}
                    <div className="mt-8 flex justify-center items-center gap-2">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="w-2 h-6 bg-cinema-gold border border-cinema-brass" />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

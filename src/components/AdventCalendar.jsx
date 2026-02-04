import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// 👇 IMPORT THE LOCK FUNCTION
import { isDayUnlocked } from '../utils/dateHelpers';

import Feb7MorseCode from '../games/Feb7MorseCode';
import Feb8RoyalQuiz from '../games/Feb8RoyalQuiz';
import Feb9ScratchOff from '../games/Feb9ScratchOff';
import Feb10GelatoBuilder from '../games/Feb10GelatoBuilder';
import Feb11LogicPuzzle from '../games/Feb11LogicPuzzle';
import Feb12GolgappaClicker from '../games/Feb12GolgappaClicker';
import Feb13TrainRunner from '../games/Feb13TrainRunner';
import Feb14Premiere from '../pages/Feb14Premiere';

// Added 'day' property for easier checking
const movies = [
    { id: 1, day: 7, date: "Feb 7", title: "Falling in Love", poster: "https://i.pinimg.com/736x/49/67/74/4967741cbf58c5dbd382625c89aa3c55.jpg", component: Feb7MorseCode },
    { id: 2, day: 8, date: "Feb 8", title: "A Christmas Prince", poster: "https://i.pinimg.com/736x/92/63/dd/9263ddf53285016f5b9cb46934c52801.jpg", component: Feb8RoyalQuiz },
    { id: 3, day: 9, date: "Feb 9", title: "Sita Ramam", poster: "https://i.pinimg.com/736x/55/b9/40/55b940562fbc00d50454b8f138be01b5.jpg", component: Feb9ScratchOff },
    { id: 4, day: 10, date: "Feb 10", title: "La Dolce Villa", poster: "https://i.pinimg.com/1200x/4e/0d/05/4e0d05c133f7b4c7c86140c5959f576b.jpg", component: Feb10GelatoBuilder },
    { id: 5, day: 11, date: "Feb 11", title: "Murder on Orient Express", poster: "https://i.pinimg.com/1200x/a9/c8/7c/a9c87c4410daac8b3972be48a9aff1c5.jpg", component: Feb11LogicPuzzle },
    { id: 6, day: 12, date: "Feb 12", title: "Queen", poster: "https://upload.wikimedia.org/wikipedia/en/4/45/QueenMoviePoster7thMarch.jpg", component: Feb12GolgappaClicker },
    { id: 7, day: 13, date: "Feb 13", title: "Jab We Met", poster: "https://upload.wikimedia.org/wikipedia/en/9/9f/Jab_We_Met_Poster.jpg", component: Feb13TrainRunner },
    { id: 8, day: 14, date: "Feb 14", title: "The Premiere", poster: "https://i.pinimg.com/736x/06/ed/11/06ed11fe632fac706b3e62376896f54d.jpg", component: Feb14Premiere }
];

const AdventCalendar = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleClose = () => {
        setSelectedMovie(null);
    };

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 max-w-6xl mx-auto pb-20">
                {movies.map((movie) => {
                    // Check if this specific day is unlocked
                    const isUnlocked = isDayUnlocked(movie.day);

                    return (
                        <div
                            key={movie.id}
                            // Only allow click if unlocked
                            onClick={() => isUnlocked && setSelectedMovie(movie)}
                            className={`relative group perspective-1000 ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        >
                            <div className={`relative h-64 w-full bg-black border-4 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 
                                ${isUnlocked
                                    ? 'border-amber-600/50 hover:scale-105 hover:border-amber-400'
                                    : 'border-gray-800 grayscale opacity-60' // Dim styles for locked cards
                                }`}
                            >
                                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

                                {/* Date Badge */}
                                <div className={`absolute top-2 right-2 px-3 py-1 text-sm rounded-full shadow-lg border 
                                    ${isUnlocked
                                        ? 'bg-amber-500 text-black border-amber-200'
                                        : 'bg-gray-700 text-gray-400 border-gray-600'
                                    }`}>
                                    {isUnlocked ? movie.date : "LOCKED"}
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                                    <h3 className={`font-serif font-bold text-lg leading-tight drop-shadow-md 
                                        ${isUnlocked ? 'text-amber-100 group-hover:text-white' : 'text-gray-500'}`}>
                                        {movie.title}
                                    </h3>
                                    <p className={`text-xs mt-1 transition-opacity 
                                        ${isUnlocked ? 'text-amber-300 opacity-0 group-hover:opacity-100' : 'text-red-500 font-bold opacity-100'}`}>
                                        {isUnlocked ? "Click to Watch" : `Available ${movie.date}`}
                                    </p>
                                </div>

                                {/* Lock Icon Overlay */}
                                {!isUnlocked && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                        <span className="text-4xl">🔒</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <AnimatePresence>
                {selectedMovie && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto pt-10"
                    >
                        {selectedMovie.id === 8 ? (
                            <div className="fixed inset-0 w-full h-full z-50">
                                <selectedMovie.component onComplete={handleClose} />
                                <button onClick={handleClose} className="fixed top-4 right-4 z-[60] text-white bg-red-600 px-3 py-1 rounded">EXIT PREMIERE</button>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.9, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                className="relative w-full max-w-4xl bg-red-950 border-4 border-amber-500 rounded-lg shadow-[0_0_50px_rgba(255,165,0,0.3)] mb-20"
                            >
                                <div className="p-2 md:p-6 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] bg-black/50 min-h-[400px] flex items-center justify-center">
                                    <selectedMovie.component onComplete={handleClose} />
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AdventCalendar;
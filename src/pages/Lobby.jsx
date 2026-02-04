import React, { useState, useEffect } from 'react';
import TimerA from '../components/TimerA';
import TimerB from '../components/TimerB';
import ProposalSection from '../components/ProposalSection';
import AdventCalendar from '../components/AdventCalendar'; // Import the calendar

const Lobby = () => {
    // State to track if the user has said "Yes"
    const [isValentine, setIsValentine] = useState(false);

    // On load, check if they already said yes
    useEffect(() => {
        const savedStatus = localStorage.getItem('valentineAccepted');
        if (savedStatus === 'true') {
            setIsValentine(true);
        }
    }, []);

    // TEMPORARY RESET BUTTON (Delete this before Feb 14th!)
    const handleReset = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-red-950 text-amber-100 p-4 relative overflow-x-hidden">

            {/* Debug Button to Reset the "Yes" choice */}
            <button
                onClick={handleReset}
                className="fixed top-4 right-4 z-50 bg-white text-red-600 font-bold px-4 py-2 rounded shadow-lg border-2 border-red-600 hover:bg-gray-100"
            >
                RESET GAME
            </button>

            {/* 1. THE INFINITE CLOCK (Always Visible) */}
            <TimerA />

            {/* 2. THE PROPOSAL OR THE COUNTDOWN */}
            {!isValentine ? (
                // If they haven't said YES yet, show the Jumping Button Game
                <ProposalSection onAccept={() => setIsValentine(true)} />
            ) : (
                // If they HAVE said YES, show the Countdown
                <div className="animate-fade-in-up transition-all duration-1000 ease-out">
                    <TimerB />
                    <div className="text-center mt-6 text-amber-300/60 italic font-serif animate-pulse">
                        "Seat reservation confirmed. See you at the movies..."
                    </div>
                </div>
            )}

            {/* 3. THE ADVENT CALENDAR (Hidden until they say Yes) */}
            <div className={`mt-16 transition-opacity duration-1000 ${isValentine ? 'opacity-100' : 'opacity-50 blur-sm pointer-events-none'}`}>
                <h2 className="text-4xl text-center font-bold text-amber-500 mb-8 font-serif drop-shadow-lg">
                    COMING ATTRACTIONS
                </h2>

                {/* This is the missing piece that displays the movie cards! */}
                <AdventCalendar />

            </div>
        </div>
    );
};

export default Lobby;
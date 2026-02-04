# Valentine's Retro Movie Theatre - Advent Calendar

A highly interactive, thematic Valentine's advent calendar website with a retro Indian movie theatre (1970s/80s "Talkies") aesthetic.

## Features

### Phase 1: The Gatekeeper (Login)
- Vintage ticket counter design
- HOUSEFULL/NOW SHOWING flip sign animation
- Passcode entry: `01/12/25`
- Dramatic gate opening transition

### Phase 2: The Lobby (Home Page)
- **Timer A**: Infinite runtime counter from October 15, 2025
- **Timer B**: Countdown to Valentine's Day 2026 (revealed after proposal acceptance)
- **Proposal Section**: "Will You Be My Valentine?" with:
  - Jumping NO button (impossible to click)
  - YES button with confetti explosion
- **Advent Calendar**: 8 movie cards (Feb 7-14) with lock/unlock mechanics

### Phase 3: Daily Screenings (Interactive Games)
- **Feb 7 - Falling in Love**: Morse Code Telegram Decoder
- **Feb 8 - A Christmas Prince**: Royal Decree Quiz
- **Feb 9 - Sita Ramam**: Hidden Letter Scratch-off
- **Feb 10 - La Dolce Villa**: Gelato Architect (drag-and-drop)
- **Feb 11 - Murder on the Orient Express**: Logic Puzzle
- **Feb 12 - Queen**: Golgappa Rapid Fire (clicking game)
- **Feb 13 - Jab We Met**: Catch the Train (endless runner)

### Phase 4: The Grand Premiere (Feb 14)
- Velvet curtain parting animation
- Filmstrip gallery (20 placeholder images)
- Director's Note (personalized letter section)
- Interactive vinyl record player with audio

## Tech Stack

- **React** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Howler.js** for audio management
- **React Router DOM** for navigation
- **date-fns** for date calculations

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Setup Instructions

### 1. Audio Files
Add the following audio files to `public/audio/`:
- `projector-loop.mp3` - Background projector sound
- `morse-code.mp3` - Morse code pattern for Feb 7
- `valentine-song.mp3` - Your favorite song for Feb 14

### 2. Images
Add personal photos to `public/images/placeholders/`:
- 2 photos per day (Feb 7-13): `feb7-photo1.jpg`, `feb7-photo2.jpg`, etc.
- 20 filmstrip images for Feb 14: `feb14-filmstrip-01.jpg` through `feb14-filmstrip-20.jpg`

### 3. Customize Content
- Update the Director's Note in `src/pages/Feb14Premiere.jsx`
- Modify quiz questions in `src/games/Feb8RoyalQuiz.jsx`
- Adjust the love note in `src/games/Feb9ScratchOff.jsx`

## Project Structure

```
src/
├── components/
│   ├── TimerA.jsx           # Infinite runtime counter
│   ├── TimerB.jsx           # Valentine's countdown
│   ├── ProposalSection.jsx  # Jumping NO button & YES with confetti
│   ├── AdventCalendar.jsx   # 8 movie cards grid
│   └── VinylPlayer.jsx      # Interactive record player
├── pages/
│   ├── Login.jsx            # Ticket counter login
│   ├── Lobby.jsx            # Main home page
│   ├── DayModal.jsx         # Screening room wrapper
│   └── Feb14Premiere.jsx    # Grand finale page
├── games/
│   ├── Feb7MorseCode.jsx
│   ├── Feb8RoyalQuiz.jsx
│   ├── Feb9ScratchOff.jsx
│   ├── Feb10GelatoBuilder.jsx
│   ├── Feb11LogicPuzzle.jsx
│   ├── Feb12GolgappaClicker.jsx
│   └── Feb13TrainRunner.jsx
├── utils/
│   ├── dateHelpers.js       # Date calculations
│   └── audioManager.js      # Howler.js wrapper
├── data/
│   └── moviesData.js        # Movie metadata
└── App.jsx                  # Main routing
```

## Key Features

- **Responsive Design**: Works on desktop and mobile
- **LocalStorage Persistence**: Saves proposal acceptance status
- **Date-based Unlocking**: Cards unlock based on current date
- **Vintage Aesthetics**: Deep reds, golds, film grain, retro fonts
- **Interactive Games**: Unique thematic mini-games for each day
- **Audio Integration**: Background sounds and interactive audio

## Customization

### Colors
Edit `tailwind.config.js` to customize the cinema color palette.

### Fonts
Google Fonts used:
- Playfair Display (serif)
- Cinzel (decorative)
- Courier Prime (monospace)

### Animations
All animations use Framer Motion. Adjust timing in component files.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

Personal project - All rights reserved

## Credits

Built with ❤️ for Valentine's Day 2026

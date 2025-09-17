# AI Hangman Game

A multilingual hangman game built with React, TypeScript, and Tailwind CSS, designed as a Chrome extension. Players can choose between English and Spanish languages, and the game includes features such as start, pause/resume, and restart options. It tracks scores, including wins/losses and time taken. The game can be played by either a human player or an AI agent.

![Initial Game State](https://github.com/user-attachments/assets/ff00d8c4-5e7b-4a53-a099-ab3d5f4a1e31)

## Features

### 🎮 Core Gameplay
- **Multilingual Support**: Play in English or Spanish with full UI translation
- **Human vs AI Player**: Switch between human input and AI player mode
- **Visual Hangman Drawing**: SVG-based hangman graphics that update with wrong guesses
- **Interactive Alphabet Keyboard**: Click letters to make guesses
- **Real-time Game State**: Live updates of guessed letters, wrong guesses, and game progress

### 🎯 Game Controls
- **New Game**: Start a fresh game with a random word
- **Pause/Resume**: Pause and resume gameplay
- **Restart**: Reset current game to main menu
- **Language Toggle**: Switch between English and Spanish
- **Player Type**: Choose between Human and AI player

### 📊 Score Tracking
- **Wins/Losses Counter**: Persistent score tracking using localStorage
- **Game Timer**: Real-time timer showing elapsed game time
- **Progress Indicator**: Visual progress bar for wrong guesses

### 🔊 Audio Features
- **Sound Effects**: Web Audio API-based sound effects for:
  - Correct letter guesses (happy ascending tones)
  - Wrong letter guesses (sad tones)
  - Game victory (fanfare)
  - Game over (defeat sound)

### 🤖 AI Player
- **Smart Guessing**: AI uses frequency analysis of common letters
- **Language-Aware**: Different letter frequencies for English vs Spanish
- **Automated Play**: AI makes guesses every 1.5 seconds
- **Visual Feedback**: Shows "AI is thinking..." during AI turns

![Active Game](https://github.com/user-attachments/assets/219eff45-2296-47e0-9c5a-44f1d32aced7)

![Spanish Version](https://github.com/user-attachments/assets/6157b739-3700-447b-9b24-af6b786ba1fe)

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Shadcn UI components
- **Graphics**: SVG-based drawing
- **State Management**: React hooks with localStorage persistence
- **Audio**: Web Audio API for sound effects
- **Chrome Extension**: Manifest V3 compatible

## Installation & Setup

### Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/realharry/ai-hangman-game.git
   cd ai-hangman-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Chrome Extension Build

1. **Build for production**
   ```bash
   npm run build:extension
   ```

2. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

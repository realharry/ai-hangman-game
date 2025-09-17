import type { LanguageData } from '../types/game';

export const languageData: Record<'en' | 'es', LanguageData> = {
  en: {
    words: [
      { word: 'JAVASCRIPT', hint: 'A programming language' },
      { word: 'COMPUTER', hint: 'Electronic device' },
      { word: 'KEYBOARD', hint: 'Input device' },
      { word: 'MONITOR', hint: 'Display screen' },
      { word: 'INTERNET', hint: 'Global network' },
      { word: 'SOFTWARE', hint: 'Computer program' },
      { word: 'HARDWARE', hint: 'Physical components' },
      { word: 'WEBSITE', hint: 'Online page' },
      { word: 'DATABASE', hint: 'Data storage' },
      { word: 'ALGORITHM', hint: 'Problem-solving method' },
      { word: 'FUNCTION', hint: 'Code block' },
      { word: 'VARIABLE', hint: 'Data container' },
      { word: 'ARRAY', hint: 'Data structure' },
      { word: 'OBJECT', hint: 'Data entity' },
      { word: 'BOOLEAN', hint: 'True or false' },
      { word: 'STRING', hint: 'Text data' },
      { word: 'NUMBER', hint: 'Numeric value' },
      { word: 'BROWSER', hint: 'Web application' },
      { word: 'SERVER', hint: 'Computer system' },
      { word: 'CLIENT', hint: 'User system' }
    ],
    ui: {
      title: 'AI Hangman Game',
      newGame: 'New Game',
      pauseResume: 'Pause/Resume',
      restart: 'Restart',
      language: 'Language',
      playerType: 'Player Type',
      human: 'Human',
      ai: 'AI',
      wins: 'Wins',
      losses: 'Losses',
      time: 'Time',
      gameWon: 'Congratulations! You won!',
      gameLost: 'Game Over! The word was',
      guessLetter: 'Guess a letter',
      wrongGuesses: 'Wrong guesses',
      hint: 'Hint'
    }
  },
  es: {
    words: [
      { word: 'ORDENADOR', hint: 'Dispositivo electrónico' },
      { word: 'TECLADO', hint: 'Dispositivo de entrada' },
      { word: 'PANTALLA', hint: 'Monitor de visualización' },
      { word: 'INTERNET', hint: 'Red global' },
      { word: 'PROGRAMA', hint: 'Software' },
      { word: 'HARDWARE', hint: 'Componentes físicos' },
      { word: 'PAGINA', hint: 'Sitio web' },
      { word: 'DATOS', hint: 'Información' },
      { word: 'ALGORITMO', hint: 'Método de resolución' },
      { word: 'FUNCION', hint: 'Bloque de código' },
      { word: 'VARIABLE', hint: 'Contenedor de datos' },
      { word: 'MATRIZ', hint: 'Estructura de datos' },
      { word: 'OBJETO', hint: 'Entidad de datos' },
      { word: 'BOOLEANO', hint: 'Verdadero o falso' },
      { word: 'CADENA', hint: 'Datos de texto' },
      { word: 'NUMERO', hint: 'Valor numérico' },
      { word: 'NAVEGADOR', hint: 'Aplicación web' },
      { word: 'SERVIDOR', hint: 'Sistema informático' },
      { word: 'CLIENTE', hint: 'Sistema del usuario' },
      { word: 'APLICACION', hint: 'Programa de software' }
    ],
    ui: {
      title: 'Juego del Ahorcado con IA',
      newGame: 'Nuevo Juego',
      pauseResume: 'Pausar/Reanudar',
      restart: 'Reiniciar',
      language: 'Idioma',
      playerType: 'Tipo de Jugador',
      human: 'Humano',
      ai: 'IA',
      wins: 'Victorias',
      losses: 'Derrotas',
      time: 'Tiempo',
      gameWon: '¡Felicidades! ¡Ganaste!',
      gameLost: '¡Juego Terminado! La palabra era',
      guessLetter: 'Adivina una letra',
      wrongGuesses: 'Intentos fallidos',
      hint: 'Pista'
    }
  }
};
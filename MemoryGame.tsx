import React, { useState, useEffect } from 'react';
import { X as CloseIcon, RefreshCw } from 'lucide-react';
import { MemoryCard } from './memory/MemoryCard';
import { GameStats } from './memory/GameStats';
import { useMemoryGame } from './memory/hooks/useMemoryGame';

interface MemoryGameProps {
  onClose: () => void;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onClose }) => {
  const {
    cards,
    flippedCards,
    moves,
    matches,
    isWon,
    handleCardClick,
    resetGame
  } = useMemoryGame();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative bg-gray-900 p-4 sm:p-8 rounded-xl shadow-2xl border border-purple-500/30 w-full max-w-[min(90vw,400px)] mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <CloseIcon size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">Memory Game</h2>
        
        <GameStats moves={moves} matches={matches} />

        <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6">
          {cards.map((card, index) => (
            <MemoryCard
              key={index}
              card={card}
              isFlipped={flippedCards.includes(index)}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>

        {isWon && (
          <div className="text-center mb-4">
            <p className="text-xl font-bold text-green-400 mb-2">
              Congratulations! You won in {moves} moves!
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={resetGame}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
          >
            <RefreshCw size={20} />
            <span>New Game</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
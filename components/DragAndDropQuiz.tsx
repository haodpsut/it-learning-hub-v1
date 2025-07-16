
import React, { useState, useMemo } from 'react';
import ContentPanel from './ContentPanel';
import { DragItem, DropTarget } from '../types';

const initialItems: DragItem[] = [
  { id: 1, text: 'LIFO Structure', pairId: 1 },
  { id: 2, text: 'Key-Value Pairs', pairId: 4 },
  { id: 3, text: 'FIFO Structure', pairId: 2 },
  { id: 4, text: 'Nodes and Edges', pairId: 3 },
];

const initialTargets: DropTarget[] = [
  { id: 1, text: 'Stack', pairId: 1 },
  { id: 2, text: 'Queue', pairId: 2 },
  { id: 3, text: 'Graph', pairId: 3 },
  { id: 4, text: 'Hash Map', pairId: 4 },
];


const DragAndDropQuiz: React.FC = () => {
    const shuffle = <T,>(array: T[]): T[] => {
        return [...array].sort(() => Math.random() - 0.5);
    };
    
  const [items, setItems] = useState<DragItem[]>(() => shuffle(initialItems));
  const [matches, setMatches] = useState<Record<number, number | null>>({ 1: null, 2: null, 3: null, 4: null });
  const [feedback, setFeedback] = useState<Record<number, 'correct' | 'incorrect' | null>>({});

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, itemId: number) => {
    e.dataTransfer.setData('itemId', itemId.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, target: DropTarget) => {
    e.preventDefault();
    const itemId = parseInt(e.dataTransfer.getData('itemId'), 10);
    const item = items.find(i => i.id === itemId);

    if (item && matches[target.id] === null) {
      const isCorrect = item.pairId === target.pairId;
      setMatches(prev => ({ ...prev, [target.id]: itemId }));
      setFeedback(prev => ({ ...prev, [target.id]: isCorrect ? 'correct' : 'incorrect' }));
      
      if(isCorrect) {
        setItems(prevItems => prevItems.filter(i => i.id !== itemId));
      }
    }
  };
  
  const handleReset = () => {
    setItems(shuffle(initialItems));
    setMatches({ 1: null, 2: null, 3: null, 4: null });
    setFeedback({});
  }

  const allMatched = useMemo(() => items.length === 0, [items]);

  return (
    <ContentPanel title="Match the Concepts">
      <p className="text-gray-400 mb-6">Drag the descriptions from the left and drop them onto the correct data structure on the right.</p>
      
       {allMatched && (
        <div className="text-center p-8 bg-green-900/50 rounded-lg">
          <h3 className="text-2xl font-bold text-green-300">Congratulations!</h3>
          <p className="text-green-400 mt-2">You've matched all the concepts correctly.</p>
          <button
                onClick={handleReset}
                className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded transition-colors duration-200"
            >
                Play Again
            </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Draggable Items */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-center">Descriptions</h3>
          <div className="space-y-3 min-h-[200px]">
            {items.map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                className="p-4 bg-gray-700 rounded-lg cursor-grab active:cursor-grabbing shadow-md"
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Droppable Targets */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-center">Data Structures</h3>
          <div className="space-y-3">
            {initialTargets.map(target => {
              const matchedItemId = matches[target.id];
              const matchedItem = initialItems.find(i => i.id === matchedItemId);
              const fb = feedback[target.id];
              const isCorrect = fb === 'correct';
              
              const borderClass = fb === 'correct' ? 'border-green-500' : (fb === 'incorrect' ? 'border-red-500' : 'border-gray-600 border-dashed');

              return (
                <div
                  key={target.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, target)}
                  className={`p-4 flex items-center justify-between bg-gray-800 rounded-lg border-2 ${borderClass} min-h-[68px] transition-all duration-300`}
                >
                  <span className="font-semibold text-gray-200">{target.text}</span>
                  {matchedItem && (
                    <div className={`p-2 rounded-md text-sm ${isCorrect ? 'bg-green-800 text-green-200' : 'bg-red-800 text-red-200'}`}>
                      {matchedItem.text}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <button onClick={handleReset} className="text-sm text-gray-400 hover:text-white hover:underline">Reset</button>
      </div>
    </ContentPanel>
  );
};

export default DragAndDropQuiz;

import React, { useState } from 'react';
import ContentPanel from './ContentPanel';

const StackVisualization: React.FC = () => {
  const [stack, setStack] = useState<string[]>(['Item 1', 'Item 2', 'Item 3']);
  const [inputValue, setInputValue] = useState('');
  const [poppedValue, setPoppedValue] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePush = () => {
    if (inputValue.trim() === '' || isAnimating || stack.length >= 8) return;
    setIsAnimating(true);
    setPoppedValue(null);
    setStack(prev => [...prev, inputValue]);
    setInputValue('');
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePop = () => {
    if (stack.length === 0 || isAnimating) return;
    setIsAnimating(true);
    const value = stack[stack.length - 1];
    setPoppedValue(value);
    setStack(prev => prev.slice(0, -1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <ContentPanel title="Stack (LIFO) Visualization">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-1 space-y-4">
          <p className="text-gray-400">
            A stack follows a "Last-In, First-Out" (LIFO) principle. The last element added is the first one to be removed.
          </p>
          <div className="space-y-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePush()}
              placeholder="Enter value..."
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={stack.length >= 8}
            />
            {stack.length >= 8 && <p className="text-xs text-yellow-400">Stack is full.</p>}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handlePush}
              disabled={inputValue.trim() === '' || isAnimating || stack.length >= 8}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Push
            </button>
            <button
              onClick={handlePop}
              disabled={stack.length === 0 || isAnimating}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Pop
            </button>
          </div>
          {poppedValue && (
            <div className="p-3 bg-yellow-900/50 rounded-md text-center text-yellow-300 transition-opacity duration-300">
              Popped: <span className="font-bold">{poppedValue}</span>
            </div>
          )}
        </div>
        
        <div className="md:col-span-2 flex justify-center items-end min-h-[350px] bg-gray-900/50 p-4 rounded-lg border-2 border-gray-700">
            <div className="flex flex-col-reverse items-center gap-2">
              {stack.map((item, index) => (
                <div
                  key={index}
                  className={`w-40 h-12 flex items-center justify-center bg-blue-500 rounded-md shadow-lg text-white font-semibold animate-fade-in-up animate-delay-[${index * 50}ms]`}
                >
                  {item}
                </div>
              ))}
              {stack.length === 0 && <div className="text-gray-500">Stack is empty</div>}
            </div>
        </div>
      </div>
    </ContentPanel>
  );
};

export default StackVisualization;
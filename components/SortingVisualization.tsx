import React, { useState, useEffect, useCallback } from 'react';
import ContentPanel from './ContentPanel';

const generateArray = (size: number) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5);
};

const SortingVisualization: React.FC = () => {
  const [array, setArray] = useState<number[]>(() => generateArray(20));
  const [isSorting, setIsSorting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [comparingIndex, setComparingIndex] = useState(-1);
  const [sortedIndex, setSortedIndex] = useState(array.length);

  const resetArray = useCallback(() => {
    if (isSorting) return;
    setArray(generateArray(20));
    setCurrentIndex(-1);
    setComparingIndex(-1);
    setSortedIndex(20);
  }, [isSorting]);

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    let n = arr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        setCurrentIndex(i);
        setComparingIndex(i + 1);
        await new Promise(res => setTimeout(res, 50));
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
          setArray([...arr]);
        }
      }
      n--;
      setSortedIndex(n);
    } while (swapped);

    setCurrentIndex(-1);
    setComparingIndex(-1);
    setIsSorting(false);
  };
  
  useEffect(() => {
      setSortedIndex(array.length)
  }, [array]);

  const getBarColor = (index: number) => {
    if(index >= sortedIndex) return 'bg-green-500';
    if(index === currentIndex) return 'bg-red-500';
    if(index === comparingIndex) return 'bg-yellow-500';
    return 'bg-blue-500';
  }

  return (
    <ContentPanel title="Bubble Sort Visualization">
      <div className="flex justify-center items-end h-80 bg-gray-900/50 p-4 rounded-lg border-2 border-gray-700 mb-6">
        {array.map((value, index) => (
          <div
            key={index}
            className={`w-full mx-[1px] transition-all duration-300 ease-in-out ${getBarColor(index)} h-[${value}%]`}
          ></div>
        ))}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={resetArray}
          disabled={isSorting}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Generate New Array
        </button>
        <button
          onClick={bubbleSort}
          disabled={isSorting}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Start Bubble Sort
        </button>
      </div>
      <div className="mt-4 flex justify-center space-x-6 text-sm">
        <div className="flex items-center"><span className="w-4 h-4 bg-green-500 mr-2 rounded"></span>Sorted</div>
        <div className="flex items-center"><span className="w-4 h-4 bg-red-500 mr-2 rounded"></span>Current Element</div>
        <div className="flex items-center"><span className="w-4 h-4 bg-yellow-500 mr-2 rounded"></span>Comparing</div>
      </div>
    </ContentPanel>
  );
};

export default SortingVisualization;
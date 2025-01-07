import React, { useState, useEffect } from 'react';
import { Timer as TimerIcon, Play, Pause, RotateCcw } from 'lucide-react';

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-2">
        <TimerIcon className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-700">Timer</h3>
      </div>
      <div className="text-3xl font-bold text-gray-800 mb-4">
        {formatTime(time)}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => {
            setTime(0);
            setIsRunning(false);
          }}
          className="flex items-center justify-center gap-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
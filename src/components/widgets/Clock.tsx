import React, { useState, useEffect } from 'react';
import { Clock as ClockIcon } from 'lucide-react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-2">
        <ClockIcon className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-700">Current Time</h3>
      </div>
      <p className="text-2xl font-bold text-gray-800">
        {time.toLocaleTimeString()}
      </p>
    </div>
  );
}
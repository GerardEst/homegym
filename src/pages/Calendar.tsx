import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Sample data - replace with real data
const workoutDays = [
  { date: '2024-03-10', type: 'completed' },
  { date: '2024-03-12', type: 'completed' },
  { date: '2024-03-15', type: 'planned' },
  { date: '2024-03-18', type: 'planned' },
];

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const workout = workoutDays.find(w => w.date === date);
      
      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-2 ${
            workout?.type === 'completed' ? 'bg-green-50' :
            workout?.type === 'planned' ? 'bg-blue-50' : ''
          }`}
        >
          <span className="font-medium">{day}</span>
          {workout && (
            <div className={`text-xs mt-1 ${
              workout.type === 'completed' ? 'text-green-600' : 'text-blue-600'
            }`}>
              {workout.type === 'completed' ? '✓ Workout completed' : '○ Planned workout'}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-medium">
            {new Date(currentYear, currentMonth).toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {daysOfWeek.map(day => (
          <div key={day} className="bg-gray-50 p-2 text-center font-medium">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>

      <div className="mt-4 flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-50 border border-green-200 rounded" />
          <span className="text-sm text-gray-600">Completed workout</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded" />
          <span className="text-sm text-gray-600">Planned workout</span>
        </div>
      </div>
    </div>
  );
}
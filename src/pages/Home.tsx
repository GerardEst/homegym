import React from 'react';
import Clock from '../components/widgets/Clock';
import Timer from '../components/widgets/Timer';
import TodayExercises from '../components/widgets/TodayExercises';

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Clock />
        <Timer />
        <TodayExercises />
      </div>
    </div>
  );
}
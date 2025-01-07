import React from 'react';
import { List as ListIcon, CheckCircle } from 'lucide-react';

const exercises = [
  { id: 1, name: 'Push-ups', sets: 3, reps: 12, completed: true },
  { id: 2, name: 'Pull-ups', sets: 3, reps: 8, completed: false },
  { id: 3, name: 'Squats', sets: 4, reps: 15, completed: false },
  { id: 4, name: 'Planks', sets: 3, duration: '1 min', completed: false },
];

export default function TodayExercises() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <ListIcon className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-700">Today's Exercises</h3>
      </div>
      <div className="space-y-3">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors"
          >
            <div className="flex items-center gap-3">
              <CheckCircle
                className={`w-5 h-5 ${
                  exercise.completed ? 'text-green-500' : 'text-gray-300'
                }`}
              />
              <div>
                <p className="font-medium text-gray-800">{exercise.name}</p>
                <p className="text-sm text-gray-500">
                  {exercise.duration
                    ? `3 sets × ${exercise.duration}`
                    : `${exercise.sets} sets × ${exercise.reps} reps`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
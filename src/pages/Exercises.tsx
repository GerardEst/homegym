import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import ExerciseModal from '../components/ExerciseModal';

const initialExercises = [
  { id: 1, name: 'Push-ups', type: 'strength', equipment: 'none' },
  { id: 2, name: 'Pull-ups', type: 'strength', equipment: 'pull-up bar' },
  { id: 3, name: 'Squats', type: 'strength', equipment: 'none' },
];

export default function Exercises() {
  const [exercises, setExercises] = useState(initialExercises);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveExercise = (exercise: any) => {
    setExercises([...exercises, { ...exercise, id: exercises.length + 1 }]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Exercises</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Exercise
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search exercises..."
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-lg text-gray-800">{exercise.name}</h3>
            <p className="text-gray-600">Type: {exercise.type}</p>
            <p className="text-gray-600">Equipment: {exercise.equipment}</p>
          </div>
        ))}
      </div>

      <ExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveExercise}
      />
    </div>
  );
}
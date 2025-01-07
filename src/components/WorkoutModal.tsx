import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';

type Exercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  breakTime: number;
};

type WorkoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workout: {
    name: string;
    exercises: Exercise[];
    duration: string;
  }) => void;
  initialData?: {
    name: string;
    exercises: Exercise[];
    duration: string;
  };
};

export default function WorkoutModal({ isOpen, onClose, onSave, initialData }: WorkoutModalProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [duration, setDuration] = useState(initialData?.duration || '30');
  const [exercises, setExercises] = useState<Exercise[]>(initialData?.exercises || []);

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { id: Date.now(), name: '', sets: 3, reps: 12, breakTime: 60 }
    ]);
  };

  const handleRemoveExercise = (id: number) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const handleExerciseChange = (id: number, field: keyof Exercise, value: string | number) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, exercises, duration: `${duration} min` });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {initialData ? 'Edit Workout' : 'Create New Workout'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Workout Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
            <input
              type="number"
              required
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Exercises</label>
              <button
                type="button"
                onClick={handleAddExercise}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" /> Add Exercise
              </button>
            </div>

            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <div key={exercise.id} className="flex gap-4 items-start p-4 bg-gray-50 rounded-md">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Exercise name"
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={exercise.name}
                      onChange={(e) => handleExerciseChange(exercise.id, 'name', e.target.value)}
                    />
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div>
                        <label className="block text-sm text-gray-600">Sets</label>
                        <input
                          type="number"
                          min="1"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={exercise.sets}
                          onChange={(e) => handleExerciseChange(exercise.id, 'sets', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Reps</label>
                        <input
                          type="number"
                          min="1"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={exercise.reps}
                          onChange={(e) => handleExerciseChange(exercise.id, 'reps', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Break (sec)</label>
                        <input
                          type="number"
                          min="0"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={exercise.breakTime}
                          onChange={(e) => handleExerciseChange(exercise.id, 'breakTime', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveExercise(exercise.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
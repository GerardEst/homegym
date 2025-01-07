import React, { useState } from 'react';
import { Calendar, Clock, Dumbbell, Plus } from 'lucide-react';
import WorkoutModal from '../components/WorkoutModal';

type Exercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  breakTime: number;
};

type Workout = {
  id: number;
  name: string;
  duration: string;
  exercises: Exercise[];
  nextScheduled: string;
};

const initialWorkouts: Workout[] = [
  {
    id: 1,
    name: 'Full Body Strength',
    duration: '45 min',
    exercises: [
      { id: 1, name: 'Push-ups', sets: 3, reps: 12, breakTime: 60 },
      { id: 2, name: 'Pull-ups', sets: 3, reps: 8, breakTime: 90 },
      { id: 3, name: 'Squats', sets: 3, reps: 15, breakTime: 60 }
    ],
    nextScheduled: '2024-03-15',
  },
  {
    id: 2,
    name: 'Upper Body Focus',
    duration: '30 min',
    exercises: [
      { id: 4, name: 'Bench Press', sets: 4, reps: 10, breakTime: 90 },
      { id: 5, name: 'Rows', sets: 4, reps: 10, breakTime: 90 },
      { id: 6, name: 'Shoulder Press', sets: 3, reps: 12, breakTime: 60 }
    ],
    nextScheduled: '2024-03-18',
  }
];

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);

  const handleSaveWorkout = (workoutData: {
    name: string;
    exercises: Exercise[];
    duration: string;
  }) => {
    if (editingWorkout) {
      // Update existing workout
      setWorkouts(workouts.map(w =>
        w.id === editingWorkout.id
          ? { ...w, ...workoutData }
          : w
      ));
    } else {
      // Create new workout
      const newWorkout: Workout = {
        id: Date.now(),
        ...workoutData,
        nextScheduled: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      };
      setWorkouts([...workouts, newWorkout]);
    }
    setEditingWorkout(null);
  };

  const handleEditWorkout = (workout: Workout) => {
    setEditingWorkout(workout);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Workouts</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Create Workout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <div key={workout.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{workout.name}</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{workout.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" />
                  <span>{workout.exercises.length} exercises</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Next: {new Date(workout.nextScheduled).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="border-t px-4 py-3 bg-gray-50">
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Start Workout
                </button>
                <button
                  onClick={() => handleEditWorkout(workout)}
                  className="px-3 py-1.5 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <WorkoutModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingWorkout(null);
        }}
        onSave={handleSaveWorkout}
        initialData={editingWorkout || undefined}
      />
    </div>
  );
}
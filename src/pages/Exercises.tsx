import { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import ExerciseModal from '../components/ExerciseModal';
import { supabase } from '../lib/supabase';
import { Exercise, NewExercise } from '../types/exercise';

export default function Exercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const {data,error} = await supabase.from('generic_exercises').select('id,name, equipment')
      if (error) throw error
    
      setExercises(data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const handleSaveExercise = async (exercise: NewExercise) => {
    try {
      const { data, error } = await supabase
        .from('generic_exercises')
        .insert([exercise])
        .select()
        .single() as { data: Exercise | null, error: Error };

      if (error) throw error;
      if (data) setExercises([...exercises, data]);
    } catch (error) {
      console.error('Error saving exercise:', error);
    }
  };

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );

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
import { useState, useEffect } from 'react';
import { Clock, Dumbbell, Plus } from 'lucide-react';
import WorkoutModal from '../components/WorkoutModal';
import { supabase } from '../lib/supabase';
//import { Exercise } from '../types/exercise';
import { Workout } from '../types/workout';

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);

  useEffect(()=>{
    fetchWorkouts();
  },[])

  const fetchWorkouts = async () => {
    try{
      const {data:workouts, error} = await supabase.from('generic_workouts').select('id,name,plan')
      if(error) throw error

      console.log(workouts)
      setWorkouts(workouts)
    }catch(error){
      console.error('Error fetching workouts:', error)
    }
  }

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
                  <span>?</span>
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" /> 
                  <span>exercises</span>
                <div>
                  {workout.plan.map((exercise:any) => {
                    return (
                      <>
                      <span>{exercise.exerciseName}</span>
                      <span>{exercise.amount ? `${exercise.amount} repetitions` : `${exercise.duration} minutes`}</span>
                      </>
                    )
                  })}
                  </div> 
                </div>
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
        //onSave={handleSaveWorkout}
        initialData={editingWorkout || undefined}
      />
    </div>
  );
}
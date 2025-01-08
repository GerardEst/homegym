export interface Exercise {
    id: number;
  name: string;
  type: string;
  equipment: string;
}

export type NewExercise = Omit<Exercise, 'id' | 'created_at'>;
import { Exercise } from "./exercise";

export type Workout = {
    id: number;
    name: string;
    plan: Exercise[];
  };
  
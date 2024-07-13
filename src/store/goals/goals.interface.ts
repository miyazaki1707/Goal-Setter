export interface Task {
  id: number;
  title: string;
  date: string;
  isItOngoing: boolean;
  complete: boolean;
}

export interface Note {
  id: number;
  title: string;
  imageUrl: string;
  text: string;
  date: number;
}

export interface Goal {
  id: number;
  title: string;
  date: string;
  motivation: string;
  category: string;
  imageUrl: string;
  tasks?: Task[];
  notes?: Note[];
  archived: boolean;
}

export interface GoalsState {
  goals: Goal[];
}

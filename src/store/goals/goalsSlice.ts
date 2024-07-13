import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Goal, GoalsState, Note, Task } from "./goals.interface";
import { DatabaseManager } from "../../api/script";

const initialState: GoalsState = {
  goals: [],
  //   goals: [
  //     {
  //       id: 1719811629582,
  //       title: "Read",
  //       date: "2024-07-04T17:00:00.000Z",
  //       motivation: "w-6 h-6w-6 h-6w-6 h-6w-6 h-6w-6 h-6w-6 h-6w-6 h-6w-6 h-6w-6 h-6w-6 h-6",
  //       category: "Personal",
  //       imageUrl: "https://i.pinimg.com/736x/31/35/27/3135276a3e0c9e65472d3e544839c658.jpg",
  //       archived: false,
  //       tasks: [
  //         {
  //           id: 1234,
  //           title: "1",
  //           date: "2024-07-24T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 12341,
  //           title: "12",
  //           date: "2024-07-24T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 12343,
  //           title: "123",
  //           date: "2024-07-24T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 12342,
  //           title: "1234",
  //           date: "2024-07-24T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //       ],
  //       notes: [
  //         {
  //           id: 171981166295825,
  //           title: "string",
  //           imageUrl: "https://i.pinimg.com/736x/d2/7e/bb/d27ebb6de481e23dafccc64d636e01bf.jpg",
  //           text: "string",
  //           date: 17198115629577,
  //         },
  //         {
  //           id: 171981162495824,
  //           title: "string",
  //           imageUrl: "https://i.pinimg.com/736x/d2/7e/bb/d27ebb6de481e23dafccc64d636e01bf.jpg",
  //           text: "string",
  //           date: 17198111629577,
  //         },
  //         {
  //           id: 17198116229582,
  //           title: "string",
  //           imageUrl: "https://i.pinimg.com/736x/d2/7e/bb/d27ebb6de481e23dafccc64d636e01bf.jpg",
  //           text: "string",
  //           date: 17198116329577,
  //         },
  //         {
  //           id: 171981162495823,
  //           title: "string",
  //           imageUrl: "https://i.pinimg.com/736x/d2/7e/bb/d27ebb6de481e23dafccc64d636e01bf.jpg",
  //           text: "string",
  //           date: 17198116292577,
  //         },
  //       ],
  //     },
  //     {
  //       id: 17198116295832,
  //       title: "Read",
  //       date: "2024-07-04T17:00:00.000Z",
  //       motivation: "w-6 h-6w-6 h-6w-6 h-6w-6 h-6w-6 h-6w-6 h-6w-6 h-6w-6 h-6w-6 h-6w-6 h-6",
  //       category: "Personal",
  //       imageUrl: "https://i.pinimg.com/736x/31/35/27/3135276a3e0c9e65472d3e544839c658.jpg",
  //       archived: false,
  //       tasks: [
  //         {
  //           id: 12345,
  //           title: "1",
  //           date: "2024-07-24T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 123412,
  //           title: "12",
  //           date: "2024-07-24T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 123434,
  //           title: "123",
  //           date: "2024-07-24T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 1234212,
  //           title: "1234",
  //           date: "2024-07-24T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //       ],
  //       notes: [
  //         {
  //           id: 17198116295824,
  //           title: "string",
  //           imageUrl: "https://i.pinimg.com/736x/d2/7e/bb/d27ebb6de481e23dafccc64d636e01bf.jpg",
  //           text: "string",
  //           date: 1719811629577,
  //         },
  //       ],
  //     },
  //     {
  //       id: 1719811629583,
  //       title: "Exercise",
  //       date: "2024-07-05T17:00:00.000Z",
  //       motivation: "Stay healthy and fit",
  //       category: "Sport",
  //       imageUrl: "https://i.pinimg.com/736x/31/35/27/3135276a3e0c9e65472d3e544839c658.jpg",
  //       archived: true,
  //       tasks: [
  //         {
  //           id: 2234,
  //           title: "Warm up",
  //           date: "2024-07-25T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 22341,
  //           title: "Cardio",
  //           date: "2024-07-25T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 22343,
  //           title: "Strength training",
  //           date: "2024-07-25T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 22342,
  //           title: "Cool down",
  //           date: "2024-07-25T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //       ],
  //       notes: [],
  //     },
  //     {
  //       id: 1719811629584,
  //       title: "Learn Coding",
  //       date: "2024-07-06T17:00:00.000Z",
  //       motivation: "Enhance programming skills",
  //       category: "Education",
  //       imageUrl: "https://i.pinimg.com/736x/31/35/27/3135276a3e0c9e65472d3e544839c658.jpg",
  //       archived: false,
  //       tasks: [
  //         {
  //           id: 3234,
  //           title: "HTML",
  //           date: "2024-07-26T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 32341,
  //           title: "CSS",
  //           date: "2024-07-26T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 32343,
  //           title: "JavaScript",
  //           date: "2024-07-26T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 32342,
  //           title: "React",
  //           date: "2024-07-26T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //       ],
  //       notes: [],
  //     },
  //     {
  //       id: 1719811629585,
  //       title: "Grocery Shopping",
  //       date: "2024-07-07T17:00:00.000Z",
  //       motivation: "Stock up on essentials",
  //       category: "Errands",
  //       imageUrl: "https://i.pinimg.com/736x/31/35/27/3135276a3e0c9e65472d3e544839c658.jpg",
  //       archived: false,
  //       tasks: [
  //         {
  //           id: 4234,
  //           title: "Make a list",
  //           date: "2024-07-27T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 42341,
  //           title: "Buy fruits",
  //           date: "2024-07-27T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 42343,
  //           title: "Buy vegetables",
  //           date: "2024-07-27T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 42342,
  //           title: "Buy dairy",
  //           date: "2024-07-27T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //       ],
  //       notes: [],
  //     },
  //     {
  //       id: 1719811629586,
  //       title: "Plan Vacation",
  //       date: "2024-07-08T17:00:00.000Z",
  //       motivation: "Relax and unwind",
  //       category: "Leisure",
  //       imageUrl: "https://i.pinimg.com/736x/31/35/27/3135276a3e0c9e65472d3e544839c658.jpg",
  //       archived: false,
  //       tasks: [
  //         {
  //           id: 5234,
  //           title: "Choose destination",
  //           date: "2024-07-28T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 52341,
  //           title: "Book flights",
  //           date: "2024-07-28T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 52343,
  //           title: "Book accommodation",
  //           date: "2024-07-28T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //         {
  //           id: 52342,
  //           title: "Pack luggage",
  //           date: "2024-07-28T17:00:00.000Z",
  //           isItOngoing: false,
  //           complete: false,
  //         },
  //       ],
  //       notes: [],
  //     },
  //   ],
};

async function saveGoalToStorage(goal: Goal) {
  const tg = Telegram.WebApp;
  const userID = tg.initDataUnsafe.user?.id;
  if (userID != undefined) {
    const db = new DatabaseManager();
    db.addData(userID, goal);
  }
}

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    getGoals(state, action: PayloadAction<Goal[]>) {
      action.payload.forEach((goal) => state.goals.push(goal));
    },
    addGoal(state, action: PayloadAction<Goal>) {
      state.goals.push(action.payload);
      saveGoalToStorage(action.payload);
    },
    completeGoal(state, action: PayloadAction<{ goalId: number }>) {
      const goal = state.goals.find((g) => g.id === action.payload.goalId);
      if (goal) {
        goal!.archived = true;
      }
    },
    unarchiveGoal(state, action: PayloadAction<{ goalId: number }>) {
      const goal = state.goals.find((g) => g.id === action.payload.goalId);
      if (goal) {
        goal!.archived = false;
      }
    },
    deleteGoal(state, action: PayloadAction<{ goalId: number }>) {
      state.goals = state.goals.filter((goal: Goal) => goal.id !== action.payload.goalId);
      const tg = Telegram.WebApp;
      const userID = tg.initDataUnsafe.user?.id;
      if (userID != undefined) {
        const db = new DatabaseManager();
        db.deleteData(userID, action.payload.goalId);
      }
    },
    addTaskToGoal(state, action: PayloadAction<{ goalId: number; task: Task }>) {
      const goal = state.goals.find((g) => g.id === action.payload.goalId);
      goal && goal.tasks?.push(action.payload.task);
      saveGoalToStorage(goal as Goal);
    },
    editGoal(
      state,
      action: PayloadAction<{
        goalId: number;
        title: string;
        date: string;
        motivation: string;
        imageUrl: string;
        category: string;
      }>,
    ) {
      const goal = state.goals.find((g) => g.id === action.payload.goalId);
      if (goal) {
        goal!.title = action.payload.title;
        goal!.date = action.payload.date;
        goal!.motivation = action.payload.motivation;
        goal!.imageUrl = action.payload.imageUrl;
        goal!.category = action.payload.category;
      }
      saveGoalToStorage(goal as Goal);
    },
    addNoteToGoal(state, action: PayloadAction<{ goalIndex: number; note: Note }>) {
      const { goalIndex, note } = action.payload;
      const goal = state.goals.find((g) => g.id === goalIndex);

      if (goal) {
        goal.notes?.push(note);
      }
      saveGoalToStorage(goal as Goal);
    },
    editNote(state, action: PayloadAction<{ goalIndex: number; noteId: number; newNote: Note }>) {
      const { goalIndex, newNote, noteId } = action.payload;
      const goal = state.goals.find((g) => g.id === goalIndex);

      if (goal && goal.notes) {
        const note = goal.notes.find((note) => note.id === noteId);
        if (note) {
          note.imageUrl! = newNote.imageUrl;
          note.text! = newNote.text;
          note.title! = newNote.title;
        }
      }
      saveGoalToStorage(goal as Goal);
    },
    updateTaskStatus(state, action: PayloadAction<{ goalId: number; taskId: number; payload: string }>) {
      const { goalId, taskId, payload } = action.payload;
      const goal = state.goals.find((g) => g.id === goalId);
      if (goal && goal.tasks) {
        const task = goal.tasks.find((t) => t.id === taskId);
        if (task) {
          payload === "isItOngoing" ? (task.isItOngoing = !task.isItOngoing) : (task.complete = !task.complete);
        }
      }
      saveGoalToStorage(goal as Goal);
    },
    deleteTask(state, action: PayloadAction<{ goalId: number; taskId: number }>) {
      const goal = state.goals.find((g) => g.id === action.payload.goalId);
      if (goal && goal.tasks) {
        goal.tasks = goal.tasks.filter((task: Task) => task.id !== action.payload.taskId);
      }
      saveGoalToStorage(goal as Goal);
    },
    editTask(state, action: PayloadAction<{ goalId: number; taskId: number; title: string; date: string }>) {
      const goal = state.goals.find((g) => g.id === action.payload.goalId);
      if (goal && goal.tasks) {
        const task = goal.tasks.find((task: Task) => task.id === action.payload.taskId);
        if (task) {
          task!.title = action.payload.title;
          task!.date = action.payload.date;
        }
      }
      saveGoalToStorage(goal as Goal);
    },
  },
});

export const {
  addGoal,
  getGoals,
  addTaskToGoal,
  updateTaskStatus,
  addNoteToGoal,
  completeGoal,
  deleteTask,
  editTask,
  editGoal,
  deleteGoal,
  editNote,
  unarchiveGoal,
} = goalsSlice.actions;
export default goalsSlice.reducer;

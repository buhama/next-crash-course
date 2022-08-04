import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Task } from "../pages";

interface TaskState {
  tasks: Task[];
  add: (newTask: Task) => void;
  delete: (id: number) => void;
  toggle: (id: number) => void;
  edit: (id: number, newTask: string) => void;
}

export const useTaskStore = create<TaskState>()(
  devtools((set) => ({
    tasks: [],
    add: (newTask: Task) =>
      set((state) => ({ tasks: [...state.tasks, newTask] })),
    delete: (id: number) => {
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    },
    toggle: (id: number) => {
      set((state) => ({
        tasks: state.tasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              completed: !task.completed,
            };
          }
          return task;
        }),
      }));
    },
    edit: (id: number, newTaskTitle: string) => {
      set((state) => ({
        tasks: state.tasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              title: newTaskTitle,
            };
          }
          return task;
        }),
      }));
    },
  }))
);

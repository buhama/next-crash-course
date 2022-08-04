import { TextField, Button } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import TaskList from "../components/TaskList";
import { useTaskStore } from "../stores/store";
import ShittyTaskComponent from "../components/ShittyTaskComponent";
import ShittyTaskList from "../components/ShittyTaskList";

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export const ListOfTasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    description: "This is task 1",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is task 2",
    completed: false,
  },
];

const Home: NextPage = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };
  const [parent] = useAutoAnimate(/* optional config */);
  const state = useTaskStore((state) => state);
  const addTask = () => {
    if (selectedTask) {
      state.edit(selectedTask.id, newTaskTitle);
      setSelectedTask(null);
      setNewTaskTitle("");

      return;
    }
    const newTask = {
      id: Math.random() * 100,
      title: newTaskTitle,
      description: "",
      completed: false,
    };
    state.add(newTask);
    setNewTaskTitle("");
  };

  return (
    <div>
      <Head>
        <title>WebDev Newz</title>
        <meta name="keywords" content="webdev, newz, news, technology" />
      </Head>
      <div>
        <TaskList
          setSelectedTask={setSelectedTask}
          setNewTask={setNewTaskTitle}
        />
        <div style={{ display: "flex", gap: "80px", alignItems: "end" }}>
          <TextField
            id="standard-basic"
            label="Add task"
            variant="standard"
            value={newTaskTitle}
            onChange={handleNewTaskChange}
          />
          <Button size="small" variant="contained" onClick={addTask}>
            {selectedTask ? "Edit Task" : "Add Task"}
          </Button>
        </div>
      </div>
      <div>
        <ShittyTaskList />
        <ShittyTaskComponent />
      </div>
    </div>
  );
};

export default Home;

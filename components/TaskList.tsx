import { List, ListSubheader } from "@mui/material";
import React from "react";
import { Task } from "../pages";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import TaskComponent from "./TaskComponent";
import { useTaskStore } from "../stores/store";

export interface Props {
  setSelectedTask: (task: Task | null) => void;
  setNewTask: (newTask: string) => void;
}

const TaskList: React.FC<Props> = ({ setSelectedTask, setNewTask }) => {
  const _taskList = useTaskStore((state) => state.tasks);

  const [parent] = useAutoAnimate(/* optional config */);

  return (
    <div>
      {" "}
      <List
        ref={parent as any}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <h1 style={{ color: "black" }}>To do list</h1>
          </ListSubheader>
        }
      >
        {_taskList.map((task) => (
          <TaskComponent
            key={task.id}
            setNewTask={setNewTask}
            setSelectedTask={setSelectedTask}
            task={task}
          />
        ))}
      </List>
    </div>
  );
};

export default TaskList;

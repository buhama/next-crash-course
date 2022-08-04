import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { pink } from "@mui/material/colors";
import React from "react";
import { Task } from "../pages";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTaskStore } from "../stores/store";
import shallow from "zustand/shallow";

export interface Props {
  setNewTask: (newTask: string) => void;
  setSelectedTask: (task: Task | null) => void;
  task: Task;
}
const TaskComponent: React.FC<Props> = ({
  setNewTask,
  setSelectedTask,
  task,
}) => {
  const state = useTaskStore((state) => state);
  return (
    <div
      style={{ display: "flex", gap: "80px", alignItems: "center" }}
      key={task.id}
    >
      <ListItemButton onClick={() => state.toggle(task.id)}>
        <ListItemIcon>
          {task.completed ? (
            <CheckIcon color="success" />
          ) : (
            <CloseIcon sx={{ color: pink[500] }} />
          )}
        </ListItemIcon>
        <ListItemText primary={task.title} />
      </ListItemButton>
      <div style={{ display: "flex", gap: "20px" }}>
        <EditIcon
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedTask(task);
            setNewTask(task.title);
          }}
        />
        <DeleteIcon
          style={{ cursor: "pointer" }}
          sx={{ color: pink[500] }}
          onClick={() => state.delete(task.id)}
        />
      </div>
    </div>
  );
};

export default TaskComponent;

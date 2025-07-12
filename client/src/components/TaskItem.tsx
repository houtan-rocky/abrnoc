import React from "react";
import type { Task } from "../types/Task";
import "./TaskItem.css";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <button
          className={`checkbox ${task.completed ? "checked" : ""}`}
          onClick={() => onToggle(task.id)}
          aria-label={
            task.completed ? "Mark as incomplete" : "Mark as complete"
          }
        >
          {task.completed && (
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="3"
              width="14"
              height="14"
            >
              <polyline points="20,6 9,17 4,12" />
            </svg>
          )}
        </button>

        <div className="task-details">
          <p className="task-description">{task.description}</p>
          <span className="task-date">{formatDate(task.createdAt)}</span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="action-btn edit-btn"
          onClick={() => onEdit(task)}
          aria-label="Edit task"
          title="Edit task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#6b7280"
            width="16"
            height="16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>

        <button
          className="action-btn delete-btn"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
          title="Delete task"
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#6b7280" 
            strokeWidth="2"
            width="16"
            height="16"
          >
            <polyline points="3,6 5,6 21,6" />
            <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

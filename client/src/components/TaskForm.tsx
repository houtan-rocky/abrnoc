import React, { useState, useEffect } from 'react';
import type { Task } from '../types/Task';
import './TaskForm.css';

interface TaskFormProps {
  onAddTask: (description: string) => void;
  editingTask: Task | null;
  onUpdateTask: (id: string, description: string) => void;
  onCancelEdit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask,
  editingTask,
  onUpdateTask,
  onCancelEdit
}) => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setDescription(editingTask.description);
    } else {
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedDescription = description.trim();
    
    if (!trimmedDescription) return;

    if (editingTask) {
      onUpdateTask(editingTask.id, trimmedDescription);
    } else {
      onAddTask(trimmedDescription);
      setDescription('');
    }
  };

  const handleCancel = () => {
    setDescription('');
    onCancelEdit();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={editingTask ? "Edit task..." : "What needs to be done?"}
          className="task-input"
          autoFocus={editingTask !== null}
        />
        <div className="form-buttons">
          {editingTask ? (
            <>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TaskForm; 
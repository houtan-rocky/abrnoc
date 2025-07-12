import React, { useState, useEffect } from 'react';
import type { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/Task';
import './TaskForm.css';

interface TaskFormProps {
  onAddTask: (taskData: CreateTaskRequest) => void;
  editingTask: Task | null;
  onUpdateTask: (id: string, taskData: UpdateTaskRequest) => void;
  onCancelEdit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask,
  editingTask,
  onUpdateTask,
  onCancelEdit
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    
    if (!trimmedTitle) return;

    if (editingTask) {
      onUpdateTask(editingTask.id, {
        title: trimmedTitle,
        description: trimmedDescription || undefined
      });
    } else {
      onAddTask({
        title: trimmedTitle,
        description: trimmedDescription || undefined
      });
      setTitle('');
      setDescription('');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    onCancelEdit();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={editingTask ? "Edit task title..." : "Task title"}
          className="task-input"
          autoFocus={editingTask !== null}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)"
          className="task-textarea"
          rows={3}
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
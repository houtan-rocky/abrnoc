import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import type { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/Task';
import apiService from '../services/api';

const DashboardPage: React.FC = () => {
  const { isAuthenticated, loading, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loadingTasks, setLoadingTasks] = useState(false);

  // Load tasks when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadTasks();
    }
  }, [isAuthenticated]);

  const loadTasks = async () => {
    setLoadingTasks(true);
    try {
      const fetchedTasks = await apiService.getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const addTask = async (taskData: CreateTaskRequest) => {
    try {
      const newTask = await apiService.createTask(taskData);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const updateTask = async (id: string, taskData: UpdateTaskRequest) => {
    try {
      const updatedTask = await apiService.updateTask(id, taskData);
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const toggleTask = async (id: string) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      const newStatus = task.status === 'DONE' ? 'TODO' : 'DONE';
      const updatedTask = await apiService.updateTask(id, { status: newStatus });
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      console.log('Deleting task with ID:', id);
      
      // If the task being deleted is currently being edited, cancel editing
      if (editingTask && editingTask.id === id) {
        setEditingTask(null);
        console.log('Cancelled editing for deleted task');
      }
      
      // Optimistically remove the task from UI immediately
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.filter(task => task.id !== id);
        console.log('Optimistically removed task, remaining tasks:', updatedTasks);
        return updatedTasks;
      });
      
      // Then make the API call
      await apiService.deleteTask(id);
      console.log('Delete API call successful');
      
    } catch (error) {
      console.error('Failed to delete task:', error);
      // If API call fails, restore the task
      console.log('Restoring task due to API failure');
      // You could reload all tasks here or restore the specific task
      loadTasks();
    }
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  const handleLogout = () => {
    logout();
    setTasks([]);
    setEditingTask(null);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will be handled by parent component
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>Cloudzy Task Hub</h1>
            <p>Streamline your workflow with cloud-powered task management</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>
      
      <main className="app-main">
        <TaskForm 
          onAddTask={addTask}
          editingTask={editingTask}
          onUpdateTask={updateTask}
          onCancelEdit={cancelEditing}
        />
        
        {loadingTasks ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onEditTask={startEditing}
          />
        )}
      </main>
    </div>
  );
};

export default DashboardPage; 
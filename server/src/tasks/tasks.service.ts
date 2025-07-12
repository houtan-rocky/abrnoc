import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private taskIdCounter = 1;

  create(createTaskDto: CreateTaskDto, userId: string): Task {
    const task: Task = {
      id: this.taskIdCounter.toString(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status || TaskStatus.TODO,
      dueDate: createTaskDto.dueDate
        ? new Date(createTaskDto.dueDate)
        : undefined,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tasks.push(task);
    this.taskIdCounter++;
    return task;
  }

  findAll(userId: string): Task[] {
    return this.tasks.filter((task) => task.userId === userId);
  }

  findOne(id: string, userId: string): Task {
    const task = this.tasks.find(
      (task) => task.id === id && task.userId === userId,
    );
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  findByStatus(status: TaskStatus, userId: string): Task[] {
    return this.tasks.filter(
      (task) => task.status === status && task.userId === userId,
    );
  }

  update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Task {
    const taskIndex = this.tasks.findIndex(
      (task) => task.id === id && task.userId === userId,
    );
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const updatedTask = {
      ...this.tasks[taskIndex],
      ...updateTaskDto,
      dueDate: updateTaskDto.dueDate
        ? new Date(updateTaskDto.dueDate)
        : this.tasks[taskIndex].dueDate,
      updatedAt: new Date(),
    };

    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  remove(id: string, userId: string): void {
    const taskIndex = this.tasks.findIndex(
      (task) => task.id === id && task.userId === userId,
    );
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.tasks.splice(taskIndex, 1);
  }
}

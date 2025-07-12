import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export class Task {
  @ApiProperty({ description: 'Unique identifier for the task' })
  id: string;

  @ApiProperty({ description: 'Title of the task' })
  title: string;

  @ApiProperty({
    description: 'Optional description of the task',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Current status of the task',
    enum: TaskStatus,
    example: TaskStatus.TODO,
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'Priority level of the task',
    enum: TaskPriority,
    example: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  @ApiProperty({
    description: 'Due date for the task',
    required: false,
    example: '2024-01-15T00:00:00.000Z',
  })
  dueDate?: Date;

  @ApiProperty({ description: 'ID of the user who owns this task' })
  userId: string;

  @ApiProperty({ description: 'Date when the task was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the task was last updated' })
  updatedAt: Date;
}

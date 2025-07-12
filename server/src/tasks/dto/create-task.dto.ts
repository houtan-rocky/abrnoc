import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    example: 'Complete project documentation',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Optional description of the task',
    required: false,
    example: 'Write comprehensive API documentation for the project',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Status of the task',
    enum: TaskStatus,
    default: TaskStatus.TODO,
    required: false,
    example: TaskStatus.TODO,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus = TaskStatus.TODO;

  @ApiProperty({
    description: 'Due date for the task (ISO string)',
    required: false,
    example: '2024-01-15T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}

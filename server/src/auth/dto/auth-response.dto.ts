import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: 'Unique identifier for the user' })
  id: string;

  @ApiProperty({ description: 'Username for login', example: 'john_doe' })
  username: string;

  @ApiProperty({ description: 'Email address', example: 'john@example.com' })
  email: string;

  @ApiProperty({ description: 'Date when the user was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the user was last updated' })
  updatedAt: Date;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'User information',
    type: UserResponseDto,
  })
  user: UserResponseDto;

  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;
}

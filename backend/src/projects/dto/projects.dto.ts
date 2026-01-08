import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  longDesc?: string;

  @ApiProperty({ type: [String], default: [] })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  demoUrl?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  repoUrl?: string;

  @ApiProperty({ type: [String], default: [] })
  @IsArray()
  @IsOptional()
  technologies?: string[];

  @ApiProperty({ type: [String], default: [] })
  @IsArray()
  @IsOptional()
  highlights?: string[];

  @ApiProperty({ default: 'web' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiProperty({ default: 0 })
  @IsNumber()
  @IsOptional()
  order?: number;
}

export class UpdateProjectDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  longDesc?: string;

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  demoUrl?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  repoUrl?: string;

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsOptional()
  technologies?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsOptional()
  highlights?: string[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  order?: number;
}

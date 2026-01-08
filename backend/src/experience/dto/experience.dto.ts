import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsDateString, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExperienceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  current?: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: [String], default: [] })
  @IsArray()
  @IsOptional()
  achievements?: string[];

  @ApiProperty({ type: [String], default: [] })
  @IsArray()
  @IsOptional()
  challenges?: string[];

  @ApiProperty({ type: [String], default: [] })
  @IsArray()
  @IsOptional()
  learnings?: string[];

  @ApiProperty({ type: [String], default: [] })
  @IsArray()
  @IsOptional()
  technologies?: string[];

  @ApiProperty({ default: 0 })
  @IsNumber()
  @IsOptional()
  order?: number;
}

export class UpdateExperienceDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  company?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  position?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  current?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsOptional()
  achievements?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsOptional()
  challenges?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsOptional()
  learnings?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsOptional()
  technologies?: string[];

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  order?: number;
}

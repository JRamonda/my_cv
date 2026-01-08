import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTechStackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  preferred?: boolean;

  @ApiProperty({ default: 0 })
  @IsNumber()
  @IsOptional()
  order?: number;
}

export class UpdateTechStackDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  preferred?: boolean;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  order?: number;
}

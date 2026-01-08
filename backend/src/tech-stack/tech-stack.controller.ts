import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TechStackService } from './tech-stack.service';
import { CreateTechStackDto, UpdateTechStackDto } from './dto/tech-stack.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('tech-stack')
@Controller('tech-stack')
export class TechStackController {
  constructor(private readonly techStackService: TechStackService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create tech stack item' })
  create(@Body() createTechStackDto: CreateTechStackDto) {
    return this.techStackService.create(createTechStackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tech stack (public)' })
  findAll() {
    return this.techStackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tech stack by ID' })
  findOne(@Param('id') id: string) {
    return this.techStackService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update tech stack item' })
  update(@Param('id') id: string, @Body() updateTechStackDto: UpdateTechStackDto) {
    return this.techStackService.update(id, updateTechStackDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete tech stack item' })
  remove(@Param('id') id: string) {
    return this.techStackService.remove(id);
  }
}

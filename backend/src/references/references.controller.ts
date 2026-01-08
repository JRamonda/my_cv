import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReferencesService } from './references.service';
import { CreateReferenceDto, UpdateReferenceDto } from './dto/references.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('references')
@Controller('references')
export class ReferencesController {
  constructor(private readonly referencesService: ReferencesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create reference' })
  create(@Body() createReferenceDto: CreateReferenceDto) {
    return this.referencesService.create(createReferenceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all references (public)' })
  findAll() {
    return this.referencesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get reference by ID' })
  findOne(@Param('id') id: string) {
    return this.referencesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update reference' })
  update(@Param('id') id: string, @Body() updateReferenceDto: UpdateReferenceDto) {
    return this.referencesService.update(id, updateReferenceDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete reference' })
  remove(@Param('id') id: string) {
    return this.referencesService.remove(id);
  }
}

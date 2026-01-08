import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTechStackDto, UpdateTechStackDto } from './dto/tech-stack.dto';

@Injectable()
export class TechStackService {
  constructor(private prisma: PrismaService) {}

  async create(createTechStackDto: CreateTechStackDto) {
    return this.prisma.techStack.create({
      data: createTechStackDto,
    });
  }

  async findAll() {
    return this.prisma.techStack.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const techStack = await this.prisma.techStack.findUnique({
      where: { id },
    });

    if (!techStack) {
      throw new NotFoundException(`Tech stack with ID ${id} not found`);
    }

    return techStack;
  }

  async update(id: string, updateTechStackDto: UpdateTechStackDto) {
    await this.findOne(id);

    return this.prisma.techStack.update({
      where: { id },
      data: updateTechStackDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.techStack.delete({
      where: { id },
    });
  }
}

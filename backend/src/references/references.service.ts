import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReferenceDto, UpdateReferenceDto } from './dto/references.dto';

@Injectable()
export class ReferencesService {
  constructor(private prisma: PrismaService) {}

  async create(createReferenceDto: CreateReferenceDto) {
    return this.prisma.reference.create({
      data: createReferenceDto,
    });
  }

  async findAll() {
    return this.prisma.reference.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const reference = await this.prisma.reference.findUnique({
      where: { id },
    });

    if (!reference) {
      throw new NotFoundException(`Reference with ID ${id} not found`);
    }

    return reference;
  }

  async update(id: string, updateReferenceDto: UpdateReferenceDto) {
    await this.findOne(id);

    return this.prisma.reference.update({
      where: { id },
      data: updateReferenceDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.reference.delete({
      where: { id },
    });
  }
}

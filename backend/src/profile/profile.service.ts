import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async create(createProfileDto: CreateProfileDto) {
    return this.prisma.profile.create({
      data: createProfileDto,
    });
  }

  async findOne() {
    // Get the first profile (assuming single profile)
    const profile = await this.prisma.profile.findFirst();
    
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    
    return profile;
  }

  async update(updateProfileDto: UpdateProfileDto) {
    // Update the first profile
    const profile = await this.prisma.profile.findFirst();
    
    if (!profile) {
      // If no profile exists, create one
      return this.create(updateProfileDto as CreateProfileDto);
    }

    return this.prisma.profile.update({
      where: { id: profile.id },
      data: updateProfileDto,
    });
  }

  async remove() {
    const profile = await this.prisma.profile.findFirst();
    
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return this.prisma.profile.delete({
      where: { id: profile.id },
    });
  }
}

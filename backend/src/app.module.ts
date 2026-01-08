// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { ProfileModule } from './profile/profile.module';
// import { ExperienceModule } from './experience/experience.module';
// import { ProjectsModule } from './projects/projects.module';
// import { SkillsModule } from './skills/skills.module';
// import { ReferencesModule } from './references/references.module';
// import { PrismaModule } from './prisma/prisma.module';
// import { TechStackService } from './tech-stack/tech-stack.service';
// import { TechStackController } from './tech-stack/tech-stack.controller';
// import { TechStackModule } from './tech-stack/tech-stack.module';

// @Module({
//   imports: [AuthModule, ProfileModule, ExperienceModule, ProjectsModule, SkillsModule, ReferencesModule, PrismaModule, TechStackModule],
//   controllers: [AppController, TechStackController],
//   providers: [AppService, TechStackService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ExperienceModule } from './experience/experience.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { ReferencesModule } from './references/references.module';
import { TechStackModule } from './tech-stack/tech-stack.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    ProfileModule,
    ExperienceModule,
    ProjectsModule,
    SkillsModule,
    ReferencesModule,
    TechStackModule,
  ],
})
export class AppModule {}
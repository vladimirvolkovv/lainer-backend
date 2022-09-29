import { Module } from '@nestjs/common';
import { PlanogramService } from './planogram.service';
import { PlanogramController } from './planogram.controller';

@Module({
  providers: [PlanogramService],
  controllers: [PlanogramController]
})
export class PlanogramModule {}

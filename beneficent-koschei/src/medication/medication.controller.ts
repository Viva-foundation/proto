import { Body, Controller, Post, Req } from '@nestjs/common';
import {
  MedicationGiveRequestDto,
  MedicationReportRequestDto,
} from './medications.dto';
import { MedicationService } from './medication.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { UserEntity } from '../db/user.entity';

@Controller('medication')
export class MedicationController {
  constructor(private medicationService: MedicationService) {}

  @Post('give')
  async giveMedication(
    @Body() body: MedicationGiveRequestDto,
    @Req() request: any,
  ) {
    return this.medicationService.giveMedication(
      body,
      request.user as UserEntity,
    );
  }

  @Post('report')
  @Roles(Role.ADMIN, Role.DOCTOR)
  async getMedicationReport(@Body() body: MedicationReportRequestDto) {
    return this.medicationService.getMedicationReport(body);
  }

  @Post('search')
  @Roles(Role.ADMIN, Role.DOCTOR)
  async searchMedication(@Body() body: { query: string }) {
    return this.medicationService.searchMedication(body.query);
  }
}

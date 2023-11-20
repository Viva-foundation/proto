import { Body, Controller, Post } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Role } from '../enums/role.enum';
import {
  PatientsBanRequestDto,
  PatientsCreateRequestDto,
  PatientsFindRequestDto,
  PatientsFindResponseDto,
} from './patients.dto';
import { Roles } from '../decorators/roles.decorator';

@Controller('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Post('search')
  @Roles(Role.ADMIN, Role.DOCTOR)
  search(
    @Body() body: PatientsFindRequestDto,
  ): Promise<PatientsFindResponseDto> {
    return this.patientsService.find(body);
  }

  @Post('create')
  @Roles(Role.ADMIN, Role.DOCTOR)
  create(
    @Body() body: PatientsCreateRequestDto,
  ): Promise<PatientsFindResponseDto> {
    return this.patientsService.create(body);
  }

  @Post('ban')
  @Roles(Role.ADMIN, Role.DOCTOR)
  ban(@Body() body: PatientsBanRequestDto): Promise<PatientsFindResponseDto> {
    return this.patientsService.ban(body);
  }

  @Post('remove')
  @Roles(Role.ADMIN, Role.DOCTOR)
  remove(
    @Body() body: PatientsBanRequestDto,
  ): Promise<PatientsFindResponseDto> {
    return this.patientsService.remove(body);
  }
}

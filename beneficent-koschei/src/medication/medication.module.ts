import { Module } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { MedicationController } from './medication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationEntity } from '../db/medication.entity';
import { MedicationFormEntity } from '../db/medication-form.entity';
import { MedicationGroupEntity } from '../db/medication-group.entity';
import { MedicationNameVariantEntity } from '../db/medication-name-variant.entity';
import { MedicationSubstanceEntity } from '../db/medication-substance.entity';
import { MedicationTakeoutEntity } from '../db/medication-takeout.entity';
import { SubstanceEntity } from '../db/substance.entity';
import { UsersModule } from '../users/users.module';
import { PatientsModule } from '../patients/patients.module';

@Module({
  imports: [
    UsersModule,
    PatientsModule,
    TypeOrmModule.forFeature([
      MedicationEntity,
      MedicationFormEntity,
      MedicationGroupEntity,
      MedicationNameVariantEntity,
      MedicationSubstanceEntity,
      MedicationTakeoutEntity,
      SubstanceEntity,
    ]),
  ],
  providers: [MedicationService],
  controllers: [MedicationController],
  exports: [MedicationService],
})
export class MedicationModule {}

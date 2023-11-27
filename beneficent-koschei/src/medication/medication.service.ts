import { Injectable } from '@nestjs/common';
import {
  MedicationGiveRequestDto,
  MedicationReportRequestDto,
  MedicationReportResponseDto,
  MedicationResponseDto,
} from './medications.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import { MedicationEntity } from '../db/medication.entity';
import { MedicationFormEntity } from '../db/medication-form.entity';
import { MedicationGroupEntity } from '../db/medication-group.entity';
import { MedicationNameVariantEntity } from '../db/medication-name-variant.entity';
import { MedicationSubstanceEntity } from '../db/medication-substance.entity';
import { MedicationTakeoutEntity } from '../db/medication-takeout.entity';
import { SubstanceEntity } from '../db/substance.entity';
import { PatientsService } from '../patients/patients.service';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../db/user.entity';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(MedicationEntity)
    private medicationsRepository: Repository<MedicationEntity>,
    @InjectRepository(MedicationFormEntity)
    private medicationFormsRepository: Repository<MedicationFormEntity>,
    @InjectRepository(MedicationGroupEntity)
    private medicationGroupsRepository: Repository<MedicationGroupEntity>,
    @InjectRepository(MedicationNameVariantEntity)
    private medicationNameVariantsRepository: Repository<MedicationNameVariantEntity>,
    @InjectRepository(MedicationSubstanceEntity)
    private medicationSubstancesRepository: Repository<MedicationSubstanceEntity>,
    @InjectRepository(MedicationTakeoutEntity)
    private medicationTakeoutsRepository: Repository<MedicationTakeoutEntity>,
    @InjectRepository(SubstanceEntity)
    private substancesRepository: Repository<SubstanceEntity>,
    private patientsService: PatientsService,
    private userService: UsersService,
  ) {}
  async giveMedication(
    body: MedicationGiveRequestDto,
    creator: UserEntity,
  ): Promise<MedicationResponseDto> {
    const patient = await this.patientsService.getPatientById(body.patient);
    for (const item of body.items) {
      const medication = await this.getMedicationById(item.medication);
      await this.medicationTakeoutsRepository.save({
        medication,
        creator,
        patient,
        quantity: item.quantity,
      });
    }
    return {
      result: true,
    };
  }

  async getMedicationById(id: string): Promise<MedicationEntity> {
    return await this.medicationsRepository.findOne({ where: { id } });
  }

  async getMedicationReport(
    body: MedicationReportRequestDto,
  ): Promise<MedicationReportResponseDto> {
    const where: FindOptionsWhere<any> = {
      createdAt: Between(new Date(body.from), new Date(body.to)),
    };
    if (body.patient_id) {
      where.patient = await this.patientsService.getPatientById(
        body.patient_id,
      );
    }
    if (body.medication_id) {
      where.mediaction.id = await this.getMedicationById(body.medication_id);
    }
    if (body.user_id) {
      where.creator.id = await this.userService.getUser(body.user_id);
    }
    const takeouts = await this.medicationTakeoutsRepository
      .createQueryBuilder('takeout')
      .where(where)
      .leftJoinAndSelect('takeout.medication', 'medication')
      .leftJoinAndSelect('takeout.creator', 'creator')
      .leftJoinAndSelect('takeout.patient', 'patient')
      .skip(body.offset)
      .take(body.limit)
      .orderBy('takeout.createdAt', 'DESC')
      .getManyAndCount();
    return {
      result: true,
      data: takeouts[0].map((takeout) => ({
        id: takeout.id,
        date: takeout.createdAt.getTime(),
        medication_id: takeout.medication.id,
        medication_name: takeout.medication.name,
        quantity: takeout.quantity,
        patient_id: takeout.patient.id,
        user_id: takeout.creator.id,
        user_name: takeout.creator.name,
      })),
      total: takeouts[1],
      from: body.from,
      to: body.to,
      offset: body.offset,
      limit: body.limit,
      patient_id: body.patient_id,
      medication_id: body.medication_id,
      user_id: body.user_id,
    };
  }

  async searchMedication(query: string) {
    const medications = await this.medicationsRepository
      .createQueryBuilder('medication')
      .where('medication.name ILIKE :query', { query: `%${query}%` })
      .leftJoinAndSelect('medication.form', 'form')
      .leftJoinAndSelect('medication.group', 'group')
      .getMany();
    return {
      result: true,
      data: medications.map((medication) => ({
        id: medication.id,
        name: medication.name,
        group: medication.group.name,
        pack_size: medication.packSize,
        unit: medication.form.form_name,
      })),
    };
  }
}

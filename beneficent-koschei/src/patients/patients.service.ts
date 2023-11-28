import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Raw, Repository } from 'typeorm';
import { PatientEntity } from '../db/patientEntity';
import {
  PatientsBanRequestDto,
  PatientsCreateRequestDto,
  PatientsFindRequestDto,
  PatientsFindResponseDto,
} from './patients.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(PatientEntity)
    private patientsRepository: Repository<PatientEntity>,
  ) {}

  async find({
    passport,
    dob,
  }: PatientsFindRequestDto): Promise<PatientsFindResponseDto> {
    const patient = await this.getPatient({ passport, dob });
    if (!patient) {
      return { result: false };
    }
    return this.getPatientIdResponse(patient);
  }

  async create({
    firstName,
    lastName,
    passport,
    dob,
    phone,
    email,
  }: PatientsCreateRequestDto): Promise<PatientsFindResponseDto> {
    const existTest = await this.getPatient({ passport, dob });
    if (existTest) {
      return this.getPatientIdResponse(existTest);
    }
    const patient = await this.patientsRepository.save({
      firstName,
      lastName,
      passport: this.passportParser(passport),
      dob: new Date(dob),
      phone,
      email: email ? email : '',
    });
    return this.getPatientIdResponse(patient);
  }

  async ban({
    dob,
    passport,
    reason,
  }: PatientsBanRequestDto): Promise<PatientsFindResponseDto> {
    const patient = await this.getPatient({ passport, dob });
    if (!patient) {
      return { result: false };
    }
    patient.isActive = false;
    patient.blockReason = reason;
    await this.patientsRepository.save(patient);
    return this.getPatientIdResponse(patient);
  }

  async remove({
    dob,
    passport,
    reason,
  }: PatientsBanRequestDto): Promise<PatientsFindResponseDto> {
    const patient = await this.getPatient({ passport, dob });
    if (!patient) {
      return { result: false };
    }
    patient.isRemoved = true;
    patient.removeReason = reason;
    await this.patientsRepository.save(patient);
    return this.getPatientIdResponse(patient);
  }

  passportParser(passport: string): string {
    return passport.replace(/\s/g, '').toLowerCase();
  }

  async getPatientById(id: string): Promise<PatientEntity> {
    return this.patientsRepository.findOne({
      where: { id },
    });
  }

  private async getPatient({ dob, passport }: PatientsFindRequestDto) {
    return this.patientsRepository.findOne({
      where: {
        passport: this.passportParser(passport),
        dob: Raw(`'${new Date(dob).toISOString().split('T')[0]} 00:00:00.000'`),
      },
    });
  }

  private getPatientIdResponse(
    patient: PatientEntity,
  ): PatientsFindResponseDto {
    const {
      id,
      isRemoved,
      isActive,
      removeReason,
      blockReason,
      lastName,
      firstName,
    } = patient;
    return {
      result: true,
      firstName,
      lastName,
      id,
      isRemoved,
      isActive,
      removeReason,
      blockReason,
    };
  }
}

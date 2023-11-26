import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    lastName,
    firstName,
  }: PatientsFindRequestDto): Promise<PatientsFindResponseDto> {
    const patient = await this.getPatient({ passport, lastName, firstName });
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
    const existTest = await this.find({ firstName, lastName, passport });
    if (existTest.result) {
      return existTest;
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
    firstName,
    lastName,
    passport,
    reason,
  }: PatientsBanRequestDto): Promise<PatientsFindResponseDto> {
    const patient = await this.getPatient({ passport, lastName, firstName });
    if (!patient) {
      return { result: false };
    }
    patient.isActive = false;
    patient.blockReason = reason;
    await this.patientsRepository.save(patient);
    return this.getPatientIdResponse(patient);
  }

  async remove({
    firstName,
    lastName,
    passport,
    reason,
  }: PatientsBanRequestDto): Promise<PatientsFindResponseDto> {
    const patient = await this.getPatient({ passport, lastName, firstName });
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

  private async getPatient({
    firstName,
    lastName,
    passport,
  }: PatientsFindRequestDto) {
    return this.patientsRepository.findOne({
      where: {
        passport: this.passportParser(passport),
        firstName,
        lastName,
      },
    });
  }

  private getPatientIdResponse(
    patient: PatientEntity,
  ): PatientsFindResponseDto {
    const { id, isRemoved, isActive, removeReason, blockReason } = patient;
    return { result: true, id, isRemoved, isActive, removeReason, blockReason };
  }
}

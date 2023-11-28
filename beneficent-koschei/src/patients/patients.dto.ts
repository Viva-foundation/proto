import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class PatientsFindRequestDto {
  @IsString()
  passport: string;
  @IsNumber()
  dob: number;
}

export class PatientsBanRequestDto {
  @IsNumber()
  dob: number;
  @IsString()
  passport: string;
  @IsString()
  reason: string;
}

export class PatientsCreateRequestDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  passport: string;
  @IsPhoneNumber()
  phone: string;
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsNumber()
  dob: number;
}

export class PatientsFindResponseDto {
  result: boolean;
  id?: string;
  firstName?: string;
  lastName?: string;
  isRemoved?: boolean;
  isActive?: boolean;
  blockReason?: string;
  removeReason?: string;
}

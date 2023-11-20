import {
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export class PatientsFindRequestDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  passport: string;
}

export class PatientsBanRequestDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
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
  isRemoved?: boolean;
  isActive?: boolean;
  blockReason?: string;
  removeReason?: string;
}

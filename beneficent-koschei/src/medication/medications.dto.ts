import { IsNumber, IsOptional, IsString } from 'class-validator';

export class MedicationsListRequestDto {
  @IsString()
  @IsOptional()
  search?: string;
  @IsNumber()
  @IsOptional()
  offset?: number;
  @IsNumber()
  @IsOptional()
  limit?: number;
  @IsOptional()
  @IsString()
  group?: string;
}

export class MedicationGiveRequestDto {
  @IsString()
  patient: string;
  items: {
    medication: string;
    quantity: number;
  }[];
}

export class MedicationReportRequestDto {
  @IsString()
  @IsOptional()
  patient_id?: string;
  @IsString()
  @IsOptional()
  medication_id?: string;
  @IsString()
  @IsOptional()
  user_id?: string;
  @IsNumber()
  from: number;
  @IsNumber()
  to: number;
  @IsNumber()
  offset: number;
  @IsNumber()
  limit: number;
}

export class MedicationReportResponseDto {
  result: boolean;
  data?: {
    id: string;
    date: number;
    medication_id: string;
    medication_name: string;
    quantity: number;
    patient_id: string;
    user_id: string;
    user_name: string;
  }[];
  total?: number;
  from?: number;
  offset?: number;
  limit?: number;
  to?: number;
  patient_id?: string;
  medication_id?: string;
  user_id?: string;
}

export class MedicationResponseDto {
  result: boolean;
}

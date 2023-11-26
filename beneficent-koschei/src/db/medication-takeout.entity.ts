import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimestamp } from './base-timestamp';
import { PatientEntity } from './patientEntity';
import { MedicationEntity } from './medication.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'medication_takeouts' })
export class MedicationTakeoutEntity extends BaseTimestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(
    () => MedicationEntity,
    (medication) => medication.medicationTakeouts,
  )
  medication: MedicationEntity;
  @ManyToOne(() => PatientEntity, (patient) => patient.medicationTakeouts)
  patient: PatientEntity;
  @Column()
  quantity: number;
  @ManyToOne(() => UserEntity, (user) => user.medicationTakeouts)
  creator: UserEntity;
  @Column({ default: true })
  isActive: boolean;
  @Column({ default: false })
  isRemoved: boolean;
}

import { BaseTimestamp } from './base-timestamp';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MedicationTakeoutEntity } from './medication-takeout.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'patients' })
export class PatientEntity extends BaseTimestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true })
  passport: string;
  @Column()
  phone: string;
  @Column()
  email?: string;
  @Column()
  dob: Date;
  @OneToMany(() => MedicationTakeoutEntity, (takeout) => takeout.patient)
  medicationTakeouts: MedicationTakeoutEntity[];
  @ManyToOne(() => UserEntity, (user) => user.patients)
  creator: UserEntity;
  @Column({ default: true })
  isActive: boolean;
  @Column({ default: '' })
  removeReason: string;
  @Column({ default: '' })
  blockReason: string;
}

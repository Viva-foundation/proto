import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';
import { Exclude } from 'class-transformer';
import { JournalEntity } from './journal.entity';
import { BaseTimestamp } from './base-timestamp';
import { PatientsEntity } from './patients.entity';
import { MedicationTakeoutEntity } from './medication-takeout.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseTimestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Exclude()
  @Column()
  hash: string;
  @Column({ array: true, type: 'text' })
  roleList: Role[];

  @OneToMany(() => JournalEntity, (journal) => journal.user)
  journal: JournalEntity[];
  @OneToMany(() => PatientsEntity, (patients) => patients.creator)
  patients: PatientsEntity[];
  @OneToMany(() => MedicationTakeoutEntity, (takeout) => takeout.creator)
  medicationTakeouts: MedicationTakeoutEntity;
  @Column({ default: true })
  isActive: boolean;
}

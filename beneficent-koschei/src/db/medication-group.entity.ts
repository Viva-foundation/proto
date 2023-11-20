import { BaseTimestamp } from './base-timestamp';
import { MedicationEntity } from './medication.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'medication_groups' })
export class MedicationGroupEntity extends BaseTimestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  isRoot: boolean;
  @OneToMany(() => MedicationGroupEntity, (group) => group.children)
  parent?: MedicationGroupEntity;
  @ManyToOne(() => MedicationGroupEntity, (group) => group.parent)
  children: MedicationGroupEntity[];
  @Column()
  name: string;
  @Column()
  description: string;
  @OneToMany(() => MedicationEntity, (medication) => medication.group)
  medications: MedicationEntity[];
}

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MedicationNameVariantEntity } from './medication-name-variant.entity';
import { BaseTimestamp } from './base-timestamp';
import { MedicationSubstanceEntity } from './medication-substance.entity';
import { MedicationFormEntity } from './medication-form.entity';
import { MedicationGroupEntity } from './medication-group.entity';
import { MedicationTakeoutEntity } from './medication-takeout.entity';

@Entity({ name: 'medications' })
export class MedicationEntity extends BaseTimestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(
    () => MedicationNameVariantEntity,
    (nameVariant) => nameVariant.medication,
  )
  nameVariants: MedicationNameVariantEntity[];
  @OneToMany(
    () => MedicationSubstanceEntity,
    (substances) => substances.medication,
  )
  substancesData: MedicationSubstanceEntity;
  @ManyToOne(() => MedicationFormEntity, (form) => form.medications)
  form: MedicationFormEntity;
  @ManyToOne(() => MedicationGroupEntity, (group) => group.medications)
  group: MedicationGroupEntity;
  @Column()
  packSize: number;
  @OneToMany(() => MedicationTakeoutEntity, (takeout) => takeout.medication)
  medicationTakeouts: MedicationTakeoutEntity;
}

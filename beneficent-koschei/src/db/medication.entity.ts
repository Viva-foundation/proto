import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MedicationNameVariantEntity } from './medication-name-variant.entity';
import { BaseTimestamp } from './base-timestamp';
import { MedicationSubstancesEntity } from './medication-substances.entity';
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
    () => MedicationSubstancesEntity,
    (substances) => substances.medication,
  )
  substancesData: MedicationSubstancesEntity;
  @ManyToOne(() => MedicationFormEntity, (form) => form.medications)
  form: MedicationFormEntity;
  @ManyToOne(() => MedicationGroupEntity, (group) => group.medications)
  group: string;
  @Column()
  packSize: number;
  @OneToMany(() => MedicationTakeoutEntity, (takeout) => takeout.medication)
  medicationTakeouts: MedicationTakeoutEntity;
}

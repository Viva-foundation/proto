import { BaseTimestamp } from './base-timestamp';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MedicationSubstancesEntity } from './medication-substances.entity';

@Entity({ name: 'substances' })
export class SubstanceEntity extends BaseTimestamp {
  @PrimaryColumn()
  name: string;
  @OneToMany(
    () => MedicationSubstancesEntity,
    (medicationSubstances) => medicationSubstances.substance,
  )
  medicationRelations: any;
}

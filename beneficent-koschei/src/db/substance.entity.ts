import { BaseTimestamp } from './base-timestamp';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MedicationSubstanceEntity } from './medication-substance.entity';

@Entity({ name: 'substances' })
export class SubstanceEntity extends BaseTimestamp {
  @PrimaryColumn()
  name: string;
  @OneToMany(
    () => MedicationSubstanceEntity,
    (medicationSubstances) => medicationSubstances.substance,
  )
  medicationRelations: any;
}

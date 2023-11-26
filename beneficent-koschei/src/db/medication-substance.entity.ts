import { BaseTimestamp } from './base-timestamp';
import { SubstanceEntity } from './substance.entity';
import { MedicationEntity } from './medication.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'medication_substances' })
export class MedicationSubstanceEntity extends BaseTimestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => MedicationEntity, (medication) => medication.substancesData)
  medication: MedicationEntity;
  @ManyToOne(
    () => SubstanceEntity,
    (substance) => substance.medicationRelations,
  )
  substance: SubstanceEntity;
  @Column()
  dosage: number;
}

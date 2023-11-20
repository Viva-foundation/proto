import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { MedicationEntity } from './medication.entity';
import { BaseTimestamp } from './base-timestamp';

@Entity({ name: 'medication_name_variants' })
export class MedicationNameVariantEntity extends BaseTimestamp {
  @PrimaryColumn({ unique: true })
  name: string;
  @ManyToOne(() => MedicationEntity, (medication) => medication.nameVariants)
  medication: string;
  @Column()
  language: string;
}

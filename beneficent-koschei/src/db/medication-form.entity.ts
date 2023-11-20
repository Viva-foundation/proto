import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MedicationEntity } from './medication.entity';

@Entity({ name: 'medication_forms' })
export class MedicationFormEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  form_name: string;
  @OneToMany(() => MedicationEntity, (medication) => medication.form)
  medications: MedicationEntity[];
}

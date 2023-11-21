import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimestamp } from './base-timestamp';

@Entity({ name: 'journal' })
export class JournalEntity extends BaseTimestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  data: string;
  @Column()
  url: string;
  @Column()
  user?: string;
  @Column()
  ip: string;
  @Column()
  ua: string;
}

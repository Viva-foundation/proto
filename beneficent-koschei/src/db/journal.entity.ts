import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
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

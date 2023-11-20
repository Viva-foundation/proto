import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JournalEntity } from '../db/journal.entity';

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(JournalEntity)
    private journalRepository: Repository<JournalEntity>,
  ) {}

  async writeRequest(data: {
    ua: string;
    url: string;
    method: string;
    user?: string;
    ip: string;
  }) {
    const journalRecord = this.journalRepository.create({
      url: data.url,
      ip: data.ip,
      user: data.user,
      name: data.method + ':' + data.url,
      data: '',
      ua: data.ua,
    });
    await this.journalRepository.save(journalRecord);
  }
}

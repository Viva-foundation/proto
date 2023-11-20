import { Module } from '@nestjs/common';
import { JournalService } from './journal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalEntity } from '../db/journal.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JournalInterceptor } from './journal.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([JournalEntity])],
  providers: [
    JournalService,
    {
      provide: APP_INTERCEPTOR,
      useClass: JournalInterceptor,
    },
  ],
  exports: [JournalService],
})
export class JournalModule {}

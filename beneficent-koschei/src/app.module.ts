import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JournalModule } from './journal/journal.module';
import { JournalEntity } from './db/journal.entity';
import { UserEntity } from './db/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type Env } from './env';
import { MulterModule } from '@nestjs/platform-express';
import { TestModule } from './test/test.module';
import * as multer from 'multer';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MedicationEntity } from './db/medication.entity';
import { MedicationFormEntity } from './db/medication-form.entity';
import { MedicationGroupEntity } from './db/medication-group.entity';
import { MedicationNameVariantEntity } from './db/medication-name-variant.entity';
import { MedicationSubstancesEntity } from './db/medication-substances.entity';
import { SubstanceEntity } from './db/substance.entity';
import { MedicationTakeoutEntity } from './db/medication-takeout.entity';
import { PatientsModule } from './patients/patients.module';
import { PatientsEntity } from './db/patients.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    JournalModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<Env>) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: +configService.get('PG_PORT'),
        username: configService.get('PG_USERNAME'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_DATABASE'),
        schema: configService.get('PG_SCHEMA'),
        entities: [
          UserEntity,
          JournalEntity,
          MedicationEntity,
          MedicationFormEntity,
          MedicationGroupEntity,
          MedicationNameVariantEntity,
          MedicationSubstancesEntity,
          SubstanceEntity,
          MedicationEntity,
          MedicationTakeoutEntity,
          PatientsEntity,
        ],
        synchronize: true,
        ssl: {
          ca: configService.get('PG_SSL_CERT'),
          rejectUnauthorized: false,
        },
        logging: true,
      }),
      inject: [ConfigService],
    }),
    TestModule,
    PatientsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {
  configure() {
    MulterModule.register({
      storage: multer.memoryStorage(),
    });
  }
}

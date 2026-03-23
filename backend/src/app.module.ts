import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationModule } from './translation/translation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'formio_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TranslationModule,
  ],
})
export class AppModule {}
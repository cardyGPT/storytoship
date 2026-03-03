import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LookupModule } from './lookup/lookup.module';
import { User } from './auth/entities/user.entity';
import { MenuItem } from './lookup/entities/menu-item.entity';
import { TranslationEntry } from './lookup/entities/translation-entry.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'cardinality',
      entities: [User, MenuItem, TranslationEntry],
      synchronize: true,
    }),
    AuthModule,
    LookupModule,
  ],
})
export class AppModule {}

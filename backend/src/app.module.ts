import { Module } from '@nestjs/common';
import { TypeORMModule } from './database/database.module';
import { TranslationModule } from './translation/translation.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeORMModule,
    TranslationModule,
    AuthModule,
  ],
})
export class AppModule {}

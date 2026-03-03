import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationController } from './translation.controller';
import { TranslationService } from './translation.service';
import { Translation } from './entities/translation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Translation])],
  controllers: [TranslationController],
  providers: [TranslationService],
  exports: [TranslationService],
})
export class TranslationModule {}
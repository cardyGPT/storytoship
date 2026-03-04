import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Translation } from './entities/translation.entity';
import { I18nService } from './i18n.service';
import { I18nController } from './i18n.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Translation])],
  controllers: [I18nController],
  providers: [I18nService],
  exports: [I18nService],
})
export class I18nModule {}
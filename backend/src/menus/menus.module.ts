import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenuTranslation } from './entities/menu-translation.entity';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, MenuTranslation])],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
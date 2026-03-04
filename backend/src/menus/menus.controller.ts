import { Controller, Get, Headers } from '@nestjs/common';
import { MenusService } from './menus.service';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  async findAll(@Headers('accept-language') lang: string) {
    const languageCode = lang ? lang.split(',')[0].split('-')[0] : 'en';
    return this.menusService.getLocalizedMenu(languageCode);
  }
}
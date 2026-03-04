import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @UseGuards(JwtAuthGuard)
  @Get('config')
  async getConfig(@Request() req) {
    return this.navigationService.getNavigationTree(req.user.role || 'VIEWER');
  }

  @Post('seed')
  async seed() {
    return this.navigationService.seed();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NavigationTab } from './navigation-tab.entity';

@Injectable()
export class NavigationService {
  constructor(
    @InjectRepository(NavigationTab)
    private navRepo: Repository<NavigationTab>,
  ) {}

  async getNavigationTree(role: string): Promise<NavigationTab[]> {
    const allTabs = await this.navRepo.find({ order: { order: 'ASC' } });
    return this.buildTree(allTabs, null);
  }

  private buildTree(tabs: NavigationTab[], parentId: string | null): any[] {
    return tabs
      .filter((tab) => tab.parentId === parentId)
      .map((tab) => ({
        ...tab,
        children: this.buildTree(tabs, tab.id),
      }));
  }

  async seed() {
    const dashboard = await this.navRepo.save({ label: 'Dashboard', path: 'dashboard', order: 1 });
    await this.navRepo.save({ label: 'Analytics', path: 'analytics', order: 1, parentId: dashboard.id });
    const ops = await this.navRepo.save({ label: 'Operations', path: 'operations', order: 2 });
    const fleet = await this.navRepo.save({ label: 'Fleet', path: 'fleet', order: 1, parentId: ops.id });
    await this.navRepo.save({ label: 'Real-time', path: 'real-time', order: 1, parentId: fleet.id });
  }
}

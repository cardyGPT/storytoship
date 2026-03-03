import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async onModuleInit() {
    const count = await this.repo.count();
    if (count === 0) {
      await this.repo.save([
        { username: 'sarah.case', fullName: 'Sarah Case', role: 'Case Manager', status: 'Active' },
        { username: 'david.analyst', fullName: 'David Analyst', role: 'Data Analyst', status: 'Inactive' },
        { username: 'admin.user', fullName: 'Admin User', role: 'Administrator', status: 'Active' },
      ]);
    }
  }

  findAll() {
    return this.repo.find();
  }
}
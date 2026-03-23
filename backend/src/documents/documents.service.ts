import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private docsRepo: Repository<Document>,
  ) {}

  findAll(search?: string) {
    if (search) {
      return this.docsRepo.find({
        where: [
          { title: Like(`%${search}%`) },
          { content: Like(`%${search}%`) }
        ]
      });
    }
    return this.docsRepo.find();
  }

  findOne(slug: string) {
    return this.docsRepo.findOne({ where: { slug } });
  }

  create(data: Partial<Document>) {
    const doc = this.docsRepo.create(data);
    return this.docsRepo.save(doc);
  }
}
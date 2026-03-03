import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LookupController } from './lookup/lookup.controller';
import { LookupService } from './lookup/lookup.service';
import { Translation } from './lookup/translation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER || 'user',
      password: process.env.DATABASE_PASSWORD || 'password',
      database: process.env.DATABASE_NAME || 'cardinality_db',
      entities: [Translation],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Translation]),
  ],
  controllers: [LookupController],
  providers: [LookupService],
})
export class AppModule implements OnModuleInit {
  constructor(private lookupService: LookupService) {}
  async onModuleInit() {
    await this.lookupService.seed();
  }
}
import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('translations')
@Index(['sourceText', 'targetLang'], { unique: true })
export class Translation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sourceText: string;

  @Column()
  targetLang: string;

  @Column({ type: 'text' })
  translatedText: string;

  @Column({ default: 'llm' }) // 'llm', 'api', 'manual'
  provider: string;

  @Column({ default: false })
  isOverride: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
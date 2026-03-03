import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TranslationEntry } from './translation-entry.entity';

@Entity('menu_items')
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string; // e.g., 'PERMISSIONS'

  @Column()
  route: string;

  @OneToMany(() => TranslationEntry, (translation) => translation.menuItem)
  translations: TranslationEntry[];
}

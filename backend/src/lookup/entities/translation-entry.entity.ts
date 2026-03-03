import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MenuItem } from './menu-item.entity';

@Entity('translation_entries')
export class TranslationEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  locale: string; // 'en', 'es', 'fr'

  @Column()
  translatedText: string;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.translations)
  menuItem: MenuItem;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Menu } from './menu.entity';

@Entity('menu_translations')
@Unique(['menuId', 'langCode'])
export class MenuTranslation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  menuId: string;

  @Column()
  langCode: string; // 'en', 'es', 'fr'

  @Column()
  label: string; // The translated text

  @ManyToOne(() => Menu, (menu) => menu.translations)
  @JoinColumn({ name: 'menuId' })
  menu: Menu;
}
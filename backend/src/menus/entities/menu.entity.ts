import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { MenuTranslation } from './menu-translation.entity';

@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string; // e.g., 'PERMISSIONS_TAB'

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => MenuTranslation, (translation) => translation.menu)
  translations: MenuTranslation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('i18n_lookup')
@Index(['locale', 'module', 'key'], { unique: true })
export class I18nLookup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  locale: string; // e.g., 'en', 'fr'

  @Column()
  module: string; // e.g., 'RBAC'

  @Column()
  key: string; // e.g., 'MENU_PERMISSIONS'

  @Column()
  value: string; // e.g., 'Permissions'
}

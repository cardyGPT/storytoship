import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('translations')
@Unique(['module', 'locale', 'key'])
export class Translation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  module: string; // e.g., 'rbac'

  @Column()
  locale: string; // e.g., 'en-US', 'es-ES'

  @Column()
  key: string; // e.g., 'MENU_PERMISSIONS'

  @Column()
  value: string; // e.g., 'Permissions'
}
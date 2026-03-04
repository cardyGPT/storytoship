import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('translations')
@Unique(['locale', 'moduleKey', 'key'])
export class Translation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  locale: string; // e.g., 'en-US', 'es-ES'

  @Column()
  moduleKey: string; // e.g., 'rbac_menu'

  @Column()
  key: string; // e.g., 'permissions_tab'

  @Column()
  value: string; // e.g., 'Permissions'
}
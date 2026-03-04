import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class NavigationTab {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column()
  path: string;

  @Column({ default: 0 })
  order: number;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  parentId: string;

  @ManyToOne(() => NavigationTab, (tab) => tab.children)
  parent: NavigationTab;

  @OneToMany(() => NavigationTab, (tab) => tab.parent)
  children: NavigationTab[];

  @Column({ default: 'VIEWER' })
  requiredRole: string;
}

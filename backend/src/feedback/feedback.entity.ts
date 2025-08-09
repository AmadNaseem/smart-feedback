import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  userName!: string;

  @Column('text')
  text!: string;

  @Column({ type: 'int', nullable: true })
  rating!: number;

  @Column({ default: 'neutral' })
  sentiment!: string;

  @CreateDateColumn()
  createdAt!: Date;
}

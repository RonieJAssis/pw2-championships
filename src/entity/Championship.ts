import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Championship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  location: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: new Date() })
  createdAt: Date;
}

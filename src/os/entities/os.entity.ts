import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Client } from '../../client/entities/client.entity';

export enum ServiceType {
  ADESIVO = 'adesivo',
  LONA = 'lona',
}

@Entity('orders')
export class OS {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryGeneratedColumn()
  sequentialId: number;

  @Column({ type: 'enum', enum: ServiceType })
  serviceType: ServiceType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  width: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  height: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  squareMeters: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalValue: number;

  @Column({ type: 'varchar', length: 255 })
  vehicle: string;

  @Column({ type: 'timestamp' })
  arrivalTime: Date;

  @Column({ type: 'timestamp' })
  pickupTime: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'employeeId' })
  employee: User;

  @Column({ type: 'uuid' })
  employeeId: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @Column({ type: 'uuid' })
  clientId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

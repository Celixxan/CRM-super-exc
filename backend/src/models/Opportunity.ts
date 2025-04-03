import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { User } from './User';
import { Customer } from './Customer';

@Entity()
@ObjectType()
export class Opportunity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Customer)
  @ManyToOne(() => Customer, { nullable: false })
  customer: Customer;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column('decimal')
  value: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  expectedCloseDate: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  assignedTo: User;

  @Field({ nullable: true })
  @Column('decimal', { nullable: true })
  probability: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  notes: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

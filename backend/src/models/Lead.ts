import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { User } from './User';
import { Customer } from './Customer';

@Entity()
@ObjectType()
export class Lead {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  source: string;

  @Field()
  @Column()
  status: string;

  @Field(() => Customer)
  @ManyToOne(() => Customer, { nullable: false })
  customer: Customer;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  assignedTo: User;

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

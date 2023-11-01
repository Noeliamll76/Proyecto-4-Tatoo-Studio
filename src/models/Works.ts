
import { BaseEntity, Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm"



@Entity("works")

export class Work extends BaseEntity {

@PrimaryGeneratedColumn()
id!:number

@Column()
createdBy_id!:number

@Column()
description!:string

@Column()
image!:string

@Column()
created_at!:Date

@Column()
update_at!:Date             

}   

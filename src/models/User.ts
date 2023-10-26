
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm"


@Entity("user")

export class User extends BaseEntity {

@PrimaryGeneratedColumn()
id!:number

@Column()
name!:string

@Column()
email!:string

@Column()
password!:string

@Column()
phone!:string

@Column()
role!:string     

@Column()
is_active!:boolean

@Column()
created_at!:Date

@Column()
update_at!:Date             




}   

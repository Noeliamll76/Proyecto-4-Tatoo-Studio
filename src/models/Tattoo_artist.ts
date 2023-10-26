
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm"


@Entity("tattoo_artist")

export class Tattoo_artist extends BaseEntity {

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
work_id!:number

@Column()
role!:string     

@Column()
is_active!:boolean

@Column()
created_at!:Date

@Column()
update_at!:Date             




}   

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Tattoo_artist } from "./Tattoo_artist"
import { User } from "./User"

@Entity("appointment")

export class Appointment extends BaseEntity {

@PrimaryGeneratedColumn()
id!:number

@Column()
user_id!:number

@Column()
artist_id!:number

@Column()
date!:Date

@Column()
shift!:string

@Column()
work!:string

@Column()
description!:string

@Column()
created_at!:Date

@Column()
update_at!:Date             

}   

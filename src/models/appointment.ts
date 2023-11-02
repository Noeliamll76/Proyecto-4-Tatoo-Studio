import { BaseEntity, Column, Entity, PrimaryGeneratedColumn,ManyToOne, JoinColumn } from "typeorm"
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
date!:string

@Column()
shift!:string

@Column()
type_work!:string

@Column()
description!:string

@Column()
created_at!:Date

@Column()
updated_at!:Date             

@ManyToOne(() => User, (user) => user.userCitas)
  @JoinColumn({ name: "user_id" }) //campo en la bd
  userAppointment!: User;

@ManyToOne(() => Tattoo_artist, (tattoo_artist) => tattoo_artist.artistCitas)
  @JoinColumn({ name: "artist_id" }) //campo en la bd
  artistAppointment!: Tattoo_artist;
}   

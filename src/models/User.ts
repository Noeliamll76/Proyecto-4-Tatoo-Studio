
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { Tattoo_artist } from "./Tattoo_artist"
import { Appointment } from "./Appointment"

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

@OneToMany(() => Appointment, (appointment) => appointment.userAppointment)
userCitas!: Appointment[]    

@ManyToMany(()=> Tattoo_artist)   // muchos a muchos con clase Tattoo_artist con una tabla union
@JoinTable({   //union con tabla intermedia
    name: "appointment",  // enlaza con tabla appointment
    joinColumn:{
        name:"user_id", // es la propiedad de appointment que me une con ella
        referencedColumnName:"id",   // de mi tabla user
    },
    inverseJoinColumn:{
        name:"artist_id",  // es la propiedad que me une tattoo_artist desde appointment
        referencedColumnName:"id",
    },
    })
    userArtists!: Tattoo_artist[] // todo lo recuperado en la clase Tattoo_artist[] se lo pasa a una propiedad nueva userArtists





}   

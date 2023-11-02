
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany, Timestamp } from "typeorm"
import { User } from "./User"
import { Appointment } from "./Appointment"

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
role!:string     

@Column()
is_active!:boolean

@Column()
created_at!:Date

@Column()
update_at!:Date             

@OneToMany(() => Appointment, (appointment) => appointment.artistAppointment)
artistCitas!: Appointment[]    


  @ManyToMany(() => User)
    @JoinTable({
      name: "appointment",
      joinColumn: {
        name: "artist_id",
        referencedColumnName: "id",
      },
      inverseJoinColumn: {
        name: "user_id",
        referencedColumnName: "id",
      },
    })
    artistUsers!: User[]


}   

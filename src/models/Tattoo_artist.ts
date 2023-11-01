
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { User } from "./User"

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

@ManyToOne(() => User, (user) => user.artists)
  @JoinColumn({ name: "user_id" }) //campo en la bd
  user!: User;

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

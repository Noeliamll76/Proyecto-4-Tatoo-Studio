
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tattoo_artist } from "./Tattoo_artist"

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

@ManyToOne(() => Tattoo_artist, (tattoo_artist) => tattoo_artist.artistWorks)
    @JoinColumn({ name: "createdBy_id" }) //campo en la bd
    works_artist!: Tattoo_artist   

}
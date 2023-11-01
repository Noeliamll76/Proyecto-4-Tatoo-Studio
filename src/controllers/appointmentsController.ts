import { Request, Response } from "express";
import { Tattoo_artist } from "../models/Tattoo_artist";
import { User } from "../models/User";


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createAppointment = async (req: Request, res: Response) => {
  try {
    const artist_id = req.body.artist_id
    const date = req.body.date
    const shift = req.body.shift
    const type_work = req.body.type_work
    const description = req.body.description

    const artist = await Tattoo_artist.findBy(
      {
        id: parseInt(artist_id)
      }
    )
    if (!artist) {
      return res.status(400).json(
        {
          success: true,
          message: 'Tattoo artist incorrect',
        }
      )
    }
    const appointmentCreate = await appointment.create(
      {
        user_id: req.token.id,
        artist_id : artist_id,
        date : date,
        shift : shift,
        type_work : type_work,
        description : description,

      }
    ).save()

    return res.json(
      {
        success: true,
        message: "Appointment retrieved",
        data: appointmentCreate
      }
    )

  } catch (error) {
    return res.json(
      {
        success: false,
        message: "Appointment cant be created",
        error: error
      }
    )
  }
}
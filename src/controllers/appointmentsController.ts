import { Request, Response } from "express";
import { Tattoo_artist } from "../models/Tattoo_artist";
import { User } from "../models/User";
import { Appointment } from "../models/Appointment";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
  try {
    const artist_id = req.body.artist_id
    const date = req.body.date
    const shift = req.body.shift
    const type_work = req.body.type_work
    const description = req.body.description

    const artist = await Tattoo_artist.findOneBy(
      { id: parseInt(artist_id) }
    );
    if (!artist) {
      return res.status(400).json(
        {
          success: false,
          message: 'Tattoo artist incorrect',
        }
      );
    }
    const appointmentCreated = await Appointment.create(
{      
        user_id: req.token.id,
        artist_id: parseInt(artist_id),
        date: date,
        shift: shift,
        type_work: type_work,
        description: description,
}).save()
    
    return res.json(
      {
        success: true,
        message: "Appointment created",
        data: appointmentCreated
      }
    );
  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: "Appointment creation failed",
        error: error
      }
    );
  }
}


export { register }
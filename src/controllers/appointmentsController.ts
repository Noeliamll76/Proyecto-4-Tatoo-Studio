import { Request, Response } from "express";
import { Tattoo_artist } from "../models/Tattoo_artist";
import { Appointment } from "../models/Appointment";
import {} from "dayjs";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const register = async (req: Request, res: Response) => {
  try {

    if (req.token.id !== parseInt(req.params.id))
      return res.status(400).json(
      {
        success: false,
        message: 'User incorrect',
      })
    
    const artist_id = req.body.artist_id
    const date = req.body.date
    const shift = (req.body.shift).toLowerCase()
    const type_work = req.body.type_work
    const description = req.body.description

    const correctDate = date.replace(/\//g, "-");
    const validar= /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    console.log (validar)
    console.log (correctDate)
    const validarDate = validar.test(correctDate)
    if (validarDate === false) {
      return res.json(
        { message: validarDate,        
          error: "Date incorrect" }
        );
    }

    const artist = await Tattoo_artist.findOneBy({
       id: parseInt(artist_id)
       })
    if (!artist) {
      return res.status(400).json(
        {
          success: false,
          message: 'the tattoo artist does not exist ',
        }
      )
    }

    const artistAvailable = await Appointment.findOne({ 
      where:
      {
        artist_id,
        date: correctDate,
        shift: shift 
      },
    });
    if (artistAvailable) {
      return res.json({
        error: "This tattoo artist has that date and shift busy ",
      });
    }
  
    const appointmentCreated = await Appointment.create(
{      
        user_id: req.token.id,
        artist_id: parseInt(artist_id),
        date: correctDate,
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
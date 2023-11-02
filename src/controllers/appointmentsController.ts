import { Request, Response } from "express";
import { Tattoo_artist } from "../models/Tattoo_artist";
import { User } from "../models/User";
import { Appointment } from "../models/Appointment";
import { } from "dayjs";

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
    const validar = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const validarDate = validar.test(correctDate)
    if (validarDate === false) {
      return res.json(
        {
          message: validarDate,
          error: "Date incorrect, must be YYYY-MM-DD"
        }
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

    const artistNotAvailable = await Appointment.findOne({
      where:
      {
        artist_id,
        date: correctDate,
        shift: shift
      },
    });
    if (artistNotAvailable) {
      return res.json({
        error: "This tattoo artist has that date and shift busy ",
      });
    }
    if (shift != "mañana" && shift != "tarde") {
      return res.json({
        error: "The shift must be mañana or tarde",
      });
    }
    if (type_work != "piercing" && type_work != "tattoo") {
      return res.json({
        error: "The type_work must be piercing or tattoo",
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

const loginAppointmentsById = async (req: Request, res: Response) => {
  try {
    if (req.token.id !== parseInt(req.params.id))
      return res.status(400).json(
        {
          success: false,
          message: 'User incorrect',
        })

      const userAppointments = await Appointment.find({
      where: {
        user_id: req.token.id
      },
      select: {
        id: true,
        artist_id: true,
        type_work: true,
        description: true,
        date: true,
        shift: true,
      },
      relations: {
        userAppointment: true,
        artistAppointment: true,
      },
    });

    const filteredAppointments = userAppointments.map((appointment) => ({
      id: appointment.id,
      artist_id: appointment.artist_id,
      type_work: appointment.type_work,
      description: appointment.description,
      date: appointment.date,
      shift: appointment.shift,
      Tattoo_artist: appointment.artistAppointment.name,
      Client: appointment.userAppointment.name,
    }));

    return res.json(
      {
        success: true,
        message: "These are your appointments",
        data: filteredAppointments
      })
  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Appointment login failed",
      error: error
    });
  }
};


export { register, loginAppointmentsById }
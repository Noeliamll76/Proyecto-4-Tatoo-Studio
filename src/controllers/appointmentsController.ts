import { Request, Response } from "express";
import { Tattoo_artist } from "../models/Tattoo_artist";
import { User } from "../models/User";
import { Appointment } from "../models/Appointment";
import { } from "dayjs";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const register = async (req: Request, res: Response) => {
  try {
    // if (req.token.id !== parseInt(req.params.id))
    //   return res.status(400).json(
    //     {
    //       success: false,
    //       message: 'User incorrect',
    //     })
    // const user_id = req.body.user_id
    const user_id = req.token.id

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
          message: "Date incorrect, must be YYYY-MM-DD"
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
        message: "This tattoo artist has that date and shift busy ",
      });
    }
    const userNotAvailable = await Appointment.findOne({
      where:
      {
        user_id,
        date: correctDate,
        shift: shift
      },
    });
    if (userNotAvailable) {
      return res.json({
        message: "You already have an appointment on that date and shift",

      });
    }
    if (shift != "mañana" && shift != "tarde") {
      return res.json({
        message: "The shift must be mañana or tarde",
      });
    }
    if (type_work != "piercing" && type_work != "tattoo") {
      return res.json({
        message: "The type_work must be piercing or tattoo",
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


    // if (req.token.id !== parseInt(req.params.id))
    //   if (req.token.role !== "super_admin")
    //     return res.status(400).json(
    //       {
    //         success: false,
    //         message: 'User incorrect',
    //       })

    const userAppointments = await Appointment.find({
      where: {
        user_id: parseInt(req.params.id)
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

const loginArtistAppointments = async (req: Request, res: Response) => {
  try {
    if (req.token.id !== parseInt(req.params.id))
      if (req.token.role !== "super_admin")
        return res.status(400).json(
          {
            success: false,
            message: 'Tattoo artist incorrect',
          })

    const artist = await Tattoo_artist.findOneBy({
      id: parseInt(req.params.id)
    })
    if (!artist) {
      return res.status(500).json({
        success: false,
        message: "Artist tattoo doesn't exist",

      })
    }

    const userAppointments = await Appointment.find({
      where: {
        artist_id: parseInt(req.params.id)
      },
      select: {
        id: true,
        user_id: true,
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
      Tatoo_artist: appointment.artistAppointment.name,
      user_id: appointment.user_id,
      Client: appointment.userAppointment.name,
      phone: appointment.userAppointment.phone,
      type_work: appointment.type_work,
      description: appointment.description,
      date: appointment.date,
      shift: appointment.shift,
    }));

    return res.json(
      {
        success: true,
        message: `These are your appointments: `,
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

const deleteAppointmentById = async (req: Request, res: Response) => {
  try {
    const appointment_id = req.body.id
    const appointmentToDelete = await Appointment.findOneBy(
      {
        id: parseInt(req.body.id),
      });

    if (!appointmentToDelete) {
      return res.status(404).json({ message: "Appointment doesn't exist" });
    }

    if (appointmentToDelete.user_id !== req.token.id) {
      if (req.token.role !== "super_admin")
        return res.status(400).json(
          {
            success: false,
            message: 'User incorrect',
          })
    }
    await Appointment.delete(appointment_id);
    return res.json(
      {
        success: true,
        message: "Appointment delete successfully",
        data: appointmentToDelete,
      });

  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateAppointmentById = async (req: Request, res: Response) => {
  try {
    const id = req.body.id
    const user_id = req.body.user_id
    const artist_id = req.body.artist_id
    const date = req.body.date
    const shift = (req.body.shift).toLowerCase()
    const type_work = req.body.type_work
    const description = req.body.description

    const oldAppointment = await Appointment.findOneBy({
      id: parseInt(id)
    })

    if (!oldAppointment) {
      return res.status(400).json(
        {
          success: false,
          message: "The appointment doesn't exist ",
        }
      )
    }
    // if (oldAppointment.user_id !== parseInt(user_id)) {
    //   return res.status(400).json(
    //     {
    //       success: false,
    //       message: "User incorrect",
    //     }
    //   )
    // }
    if (oldAppointment.user_id !== parseInt(user_id)) {
      if (req.token.id !== parseInt(user_id)) {
        if (req.token.role !== "super_admin")
          return res.status(400).json(
            {
              success: false,
              message: 'User incorrect',
            })
      }
    }
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

    if (oldAppointment.artist_id != artist_id ||
      oldAppointment.date != correctDate ||
      oldAppointment.shift != shift) {
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
    }
    const appointmentUpdate = await Appointment.update(
      {
        id: parseInt(req.body.id)
      },
      {
        user_id: user_id,
        artist_id: parseInt(artist_id),
        date: correctDate,
        shift: shift,
        type_work: type_work,
        description: description,
      })

    return res.json(
      {
        success: true,
        message: "Appointment update successfully",

      }

    );
  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: "Appointment update failed",
        error: error
      }
    );
  }
}

export { register, loginAppointmentsById, loginArtistAppointments, deleteAppointmentById, updateAppointmentById }
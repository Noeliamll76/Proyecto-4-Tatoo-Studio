import { Request, Response } from "express";
import { User } from "../models/User";
import { Tatto_artist } from "../models/Tattoo_artist";

const createAppointment = async (req: Request, res: Response) => {
  try {
    //recuperar la info
    const title = req.body.title
    const description = req.body.description

    //validar si hace falta la info
    //tratar si hace falta la info

    const task = await Task.create(
      {
        title: title,
        description: description,
        user_id: req.token.id
      }
    ).save()

    return res.json(
      {
        success: true,
        message: "users retrieved",
        data: task
      }
    )

  } catch (error) {
    return res.json(
      {
        success: false,
        message: "task cant be created",
        error: error
      }
    )
  }
}
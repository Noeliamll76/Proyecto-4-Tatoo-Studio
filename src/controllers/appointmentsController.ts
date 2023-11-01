import { Request, Response } from "express";
import { Tattoo_artist } from "../models/Tattoo_artist";
import { User } from "../models/User";

const createAppointment = async (req: Request, res: Response) => {
  try {
    const artist_id = req.body.artist_id
    const date = req.body.date
    const shift = req.body.shift
    const type_work = req.body.type_work
    const description = req.body.description

    if ( parseInt(req.params.id) !== req.token.id){
        return res.json(
          {
            success: true,
            message: 'User incorrect',
          }
        )
      }

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
    const appointment = await Task.create(
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
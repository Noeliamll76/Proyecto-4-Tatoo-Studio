import { Request, Response } from "express";
import { Tattoo_artist } from "../models/Tattoo_artist";
import { Work } from "../models/Work";

const registerWork = async (req: Request, res: Response) => {
  try {
    const createdBy_id = req.body.createdBy_id
    const description = req.body.description
    const image = req.body.image
    
    const artist = await Tattoo_artist.findOneBy({ id: parseInt(req.body.createdBy_id )})
    if (!artist) {
      return res.json({ message: 'Tattoo artist doesn`t exist', })
    }

    const newWork = await Work.create({
      createdBy_id: parseInt(createdBy_id),
      description: description,
      image:image,
    }).save()

    return res.json({
      success: true,
      message: "Work created succesfully",
      token: newWork
    }
    )
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Work cannot be created",
      error: error
    })
  }
}


export { registerWork,   }

import { Request, Response } from "express";
import { Tattoo_artist } from "../models/Tattoo_artist";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
  try {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const phone = req.body.phone

    const validarEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!validarEmail.test(email)) {
      return res.json({ mensaje: 'Correo electrónico no válido' })
    }

    const artist = await Tattoo_artist.findOneBy({ email: email })
    if (artist) {
      return res.json({ message: 'Existing tatto artist', })
    }

    const encryptedPassword = bcrypt.hashSync(password, 10)
    const newArtist = await Tattoo_artist.create({
      name: name,
      email: email,
      password: encryptedPassword,
      phone: phone
    }).save()
    return res.json({
      success: true,
      message: "User created succesfully",
      token: newArtist
    }
    )
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Tattoo artist cannot be created",
      error: error
    })
  }
}



export { register, }

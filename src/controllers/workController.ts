import { Request, Response } from "express";
import { User } from "../models/User";
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

    const user = await User.findOneBy({ email: email })
    if (user) {
      return res.json({ message: 'Existing user', })
    }

    const encryptedPassword = bcrypt.hashSync(password, 10)
    const newUser = await User.create({
      name: name,
      email: email,
      password: encryptedPassword,
      phone: phone
    }).save()
    return res.json({
      success: true,
      message: "User created succesfully",
      token: newUser
    }
    )
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot be created",
      error: error
    })
  }
}

const profile = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneBy(
      { id: req.token.id })
    return res.json(
      {
        success: true,
        message: "Profile user retrieved",
        data: {
          name: user!.name,
          email: user!.email,
          phone: user!.phone,
          role: user!.role,
          created_at: user!.created_at
        }
      }
    )
  } catch (error) {
    return res.json(
      {
        success: false,
        message: "user profile cant be retrieved",
        error: error
      }
    )
  }
}



export { register,  profile, }

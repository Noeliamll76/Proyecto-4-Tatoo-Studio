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

const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOneBy(
      { email: email }
    )
    if (!user) {
      return res.status(400).json(
        {
          success: true,
          message: 'User or password incorrect',
        }
      )
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json(
        {
          success: true,
          message: 'User or password incorrect',
        }
      )
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email
      },
      "BE$UG0",
      {
        expiresIn: "12h",
      }
    );

    return res.json(
      {
        success: true,
        message: "User logged succesfully",
        token: token
      }
    )
  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: "users cant be logged",
        error: error
      }
    )
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

const updateUserByToken = async (req: Request, res: Response) => {
  try {
    const name = req.body.name
    let email = req.body.email
    const password = req.body.password
    const phone = req.body.phone

    const user = await User.findOneBy(
      {
        id: req.token.id
      }
    )

    if (!user) {
      return res.status(404).json({
        success: true,
        message: "User doesnt found and cant updated",
      })
    }

    const validarEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!email) {
      email = req.token.email
    }

    if (!validarEmail.test(email)) {
      return res.json({ mensaje: 'Correo electrónico no válido' })
    }

    if (password) {
      const encryptedPassword = bcrypt.hashSync(password, 10)
      const updateUser = await User.update(
        {
          id: req.token.id
        },
        {
          password: encryptedPassword
        })
    }
    const updateUser = await User.update(
      {
        id: req.token.id
      },
      {
        name: name,
        email: email,
        phone: phone
      }
    )

    return res.json({
      success: true,
      message: "User updated",
      data: updateUser
    })
  } catch (error) {
    return res.json({
      success: false,
      message: "User cant by updated",
      error: error
    })
  }
}

const deleteById = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.id
    const user = await User.findOneBy(
      { id: parseInt(user_id), }
    )
    if (!user) {
      return res.status(400).json(
        {
          success: true,
          message: 'User incorrect',
        }
      )
    }
    const userDelete = await User.delete(
      { id: parseInt(user_id), }
    )
    return res.json(
      {
        success: true,
        message: "You have deleted user",
        data:user,

      })
  } catch (error) {
    return res.json(
      {
        success: false,
        message: "user cant be deleted",
        error: error
      }
    )
  }
}

export { register, login, profile, updateUserByToken, deleteById }

import { Request, Response } from "express";
import { User } from "../models/User";
import { isNonNullExpression } from "typescript";
import { IsNull } from "typeorm";
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
            return res.json({ message: 'Existing user',})
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
    } catch (error) 
    {
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
        { email: email}
      )
        if (!user) {
        return res.status(400).json(
          { success: true,
            message: 'User or password incorrect',}
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


  
export { register, login }

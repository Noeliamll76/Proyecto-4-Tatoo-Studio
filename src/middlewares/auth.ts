import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenDecoded } from "../types";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.json(
        {
          message: 'AUTH_REQUIRED no recibo req.headers.authorization'
        }
      )
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.json(
        {
          message: 'AUTH_REQUIRED no recibo req.headers.authorization.split'
        }
      )
    }

    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenDecoded

    req.token = tokenDecoded
    
    next()
  } catch (error) {
    return res.json({
      error: "por el catch Not auth"
    })
  }
}

export { auth }
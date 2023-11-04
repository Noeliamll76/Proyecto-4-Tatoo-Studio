import { NextFunction, Request, Response } from "express";

const isAdmin = (req: any, res: Response, next: NextFunction) => {

  if (req.token.role === "user") {
   
    return res.json('You do not have access to this task')
  }

  next();
}

export { isAdmin }
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

async function validate (req: Request, res: Response, next: NextFunction) {
  try {
    var decoded = jwt.verify(req.body.token, 'secret');
    console.log(decoded)
    next()
  } catch(err) {
    return res.status(500)
  }
}

export default validate

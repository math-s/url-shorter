import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'

async function validate (req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.sendStatus(401)
  }

  const [, token] = authorization.split(' ')

  try {
    await promisify(jwt.verify)(token)

    return next()
  } catch (err) {
    return res.sendStatus(401)
  }
}

export default validate

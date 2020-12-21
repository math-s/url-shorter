import { NextFunction, Request, Response } from 'express'

const getLinksByUser = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: 'pong'
  })
}

const createLink = (req: Request, res: Response, next:NextFunction) => {

}

export default { getLinksByUser, createLink }

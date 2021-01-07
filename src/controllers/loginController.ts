import { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const login = async (req: Request, res: Response, next: NextFunction) => {
  console.log(`[POST] /login ${req.body.email} - ${req.body.password}`)
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email
    }
  })
  try {
    if(user) {
      bcrypt.compare(req.body.password, user.hashPassword, function(err,result) {
        if(result){
          const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            user: user.id
          }, 'secret');
          res.status(200).jsonp({token: token, auth:true}).send()
        }
        if(!result) {
          res.sendStatus(401) 
        }
      })
    }
    else {
      res.sendStatus(404) 
    }
  }
  catch(err) {
    console.log(err)
  }
}
// TODO: handle error of not unique email
const signup = async (req: Request, res: Response, next: NextFunction) => {
  const textPassword = req.body.password
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(textPassword, salt)

  if (typeof req.body.email === 'string' && typeof req.body.name === 'string') {
    await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        hashPassword: hash,
        role: 'USER'
      }
    })
    return res.sendStatus(200)
  } else { return res.sendStatus(400) }
}

export default { login, signup }

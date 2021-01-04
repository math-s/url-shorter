import { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { add } from 'date-fns'
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
      console.log('user true')
      bcrypt.compare(req.body.password, user.hashPassword, function(err,result) {
        if(result){
          console.log('result true 200')
          res.sendStatus(200)
        }
        if(!result) {
          console.log('result false 401')
          res.sendStatus(401) 
        }
      })
    }
    else {
      console.log('user false 404')
      res.sendStatus(404) 
    }
  }
  catch(err) {
    console.log(err)
  }
}

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

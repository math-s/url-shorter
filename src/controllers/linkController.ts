import { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const getLinksByUser = async (req: Request, res: Response, next: NextFunction) => {

  try {
    var decoded = jwt.verify(req.body.token, 'secret');
    console.log(decoded)
  } catch(err) {
    return res.status(500)
  }
  try{ 
    const linksByUser = await prisma.links.findMany({
      where: {
        authorId: req.body.id
      }
    })
    if (linksByUser.length > 0) {
      console.log(linksByUser.length)
      return res.status(200).json(linksByUser)
    } else {
      return res.status(404)
    }
  }
  catch(err){
    console.log(err)
  }

}

const createLink = async (req: Request, res: Response, next:NextFunction) => {
  console.log('[POST] criar link')
  const short = Math.random().toString(36).substring(2, 10) 
  try {
    await prisma.links.create({
    data: {
      long: req.body.long,
      short: short,
      title: req.body.title,
      clicks: 0,
      author: {
        connect:
              {
                id: req.body.userId
              }
        }
      }
    })
    res.status(200).end()
  }
  catch (err) {
    console.log(err)
  }
}

const updateLink = async (req: Request, res: Response, next: NextFunction) => {
 
  try {
    const link = await prisma.links.update({
      where: {id: req.body.id },
      data: {title: req.body.title},
    })
   }
  catch (err) {
    console.log(err)
  }
  res.sendStatus(200)
}

const deleteLink = async (req: Request, res: Response, next: NextFunction) => {
  const link = await prisma.links.delete({
    where: 
    {
      id: req.body.id
    }
  })
  res.sendStatus(200)
}

const shortredirect = async (req: Request, res: Response, next: NextFunction) => {
  const link = await prisma.links.findFirst({
    where: {
      short: req.params.short
    }
  })

  if(link){
    const counter = link!.clicks +1
    const count = await prisma.links.update({
      where:{short: req.params.short},
      data:{clicks:counter}
    })
    res.redirect(link.long)
  }
  else{res.sendStatus(404).end()}
}

export default { 
  getLinksByUser, 
  createLink, 
  updateLink, 
  shortredirect, 
  deleteLink
}

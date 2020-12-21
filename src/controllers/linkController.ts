import { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getLinksByUser = async (req: Request, res: Response, next: NextFunction) => {
  const linksByUser = await prisma.links.findMany({
    where: {
      authorId: req.body.id
    }
  })
  if (linksByUser) {
    return res.status(200).json(linksByUser)
  } else {
    return res.status(404)
  }
}

const createLink = async (req: Request, res: Response, next:NextFunction) => {
  await prisma.links.create({
    data: {
      long: req.body.long,
      title: req.body.title,
      author: {
        connect:
              {
                id: req.body.userId
              }
      }
    }
  })
  res.status(200)
}

const updateLink = async (req: Request, res: Response, next: NextFunction) => {
  const link = await prisma.links.update({
    where: {
      long: req.body.long
    },
    data: {
      title: req.body.title
    }
  })
}

export default { getLinksByUser, createLink, updateLink }

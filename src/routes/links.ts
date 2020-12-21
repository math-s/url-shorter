import express from 'express'
import controller from '../controllers/linkController'

const router = express.Router()

router.get('/links', controller.getLinksByUser)

router.post('/links', controller.createLink)

export = router;

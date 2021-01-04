import express from 'express'
import linkController from './controllers/linkController'
import loginController from './controllers/loginController'
import validate from './auth'

const router = express.Router()

router.get('/link', linkController.getLinksByUser)

router.post('/link', linkController.createLink)

router.put('/link', linkController.updateLink)

router.delete('/link', linkController.deleteLink)

router.get('/', (req, res) => {return res.status(200).end()})

router.post('/login', loginController.login)

router.post('/signup', loginController.signup)

router.get('/:short', linkController.shortredirect)

export = router

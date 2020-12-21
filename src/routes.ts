import express from 'express'
import linkController from './controllers/linkController'
import loginController from './controllers/loginController'
// import usercontroller from './controllers/userController'

const router = express.Router()

router.get('/link', linkController.getLinksByUser)

router.post('/link', linkController.createLink)

router.put('/link', linkController.updateLink)

router.get('/', (req, res) => {
  return res.status(200)
})

router.post('/login', loginController.login)

export = router

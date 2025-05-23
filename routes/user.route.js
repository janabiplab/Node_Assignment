import * as userController from "../controllers/user.controller.js"


import {Router} from "express"

const router=Router()

router.post('/signup',
    userController.createUserController
)

router.post('/login',
    userController.loginController
)

export default router
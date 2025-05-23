import {Router} from "express"
import * as bookController from "../controllers/book.controller.js"
import * as authMiddleware from "../middlewares/auth.middleware.js"

const router=Router()

router.post('/',
    authMiddleware.authUser,
    bookController.addBook
)

router.get('/',
    bookController.getAllBook
)

router.get('/search',
    bookController.getAllBookBySearch
)



export default router
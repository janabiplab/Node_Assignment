import {Router} from "express"

import * as authMiddleware from "../middlewares/auth.middleware.js"
import * as reviewController from "../controllers/review.controller.js"

const router=Router()

router.post("/:id/reviews",
    authMiddleware.authUser,
    reviewController.submitReview
)

router.get("/:id",
    reviewController.getBookDetails
)

router.put("/reviews/:id",
    authMiddleware.authUser,
    reviewController.getUpdatedReview
)

router.delete("/reviews/:id",
    authMiddleware.authUser,
    reviewController.getDeletedReview
)

export default router
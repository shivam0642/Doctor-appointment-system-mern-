import express from "express";
import { createMessage, deleteMessage, getAllMessages } from "../controller/webMessageController.js";
import { isAdmin } from "../middlewares/authMiddleware.js";
import { requireSignIn } from "../middlewares/requireSignIn.js";

const router = express.Router();

//CREATE WEB MESSAGE || POST
router.post('/createMessage',createMessage)

//GET ALL WEB MESSAGES || GET
router.get('/getAllMessages',getAllMessages)

//DELETE WEB MESSAGE || DELETE
router.delete('/deleteMessage/:id',requireSignIn,isAdmin,deleteMessage)



export default router;
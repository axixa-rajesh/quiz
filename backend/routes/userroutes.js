import express from "express";
import {getUsers,createUsers,updateUsers} from "../controllers/usercontroller.js";
import { validateUser } from "../validators/uservalidator.js";

const router=express.Router();

router.get('/',getUsers);

router.post('/',createUsers);  

router.put('/:id',updateUsers);

export default router;              
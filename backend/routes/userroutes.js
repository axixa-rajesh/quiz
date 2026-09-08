import express from "express";
import {getUsers,createUsers,updateUsers} from "../controllers/usercontroller.js";
import { validateUser } from "../validators/uservalidator.js";

let router=express.Router();

router.get('/users',getUsers);

router.post('/users',validateUser,createUsers);

router.put('/users/:id',validateUser,updateUsers);

export default router;              
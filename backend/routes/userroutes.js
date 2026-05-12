import express from "express";
import {getUsers,createUsers,updateUsers} from "../controllers/user.controller.js";
import { validateUser } from "../validations/user.validation.js";
``
let router=express.Router();

router.get('/users',getUsers);

router.post('/users',createUsers,validateUser);

router.put('/users/:id',updateUsers,validateUser);

export default router;              
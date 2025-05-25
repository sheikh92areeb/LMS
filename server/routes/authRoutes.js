import express from 'express';
import { createUser, loginUser, logoutUser } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/register', createUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);


export default authRouter;
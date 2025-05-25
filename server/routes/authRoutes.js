import express from 'express';
import { createUser, loginUser, logoutUser } from '../controllers/authController.js';
import userAuth from '../middlewares/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', createUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', userAuth, logoutUser);

export default authRouter;
// routes/auth.routes.js


import { Router } from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controllers.js';

const authRouter = Router();

//path is /api/v1/auth/sign-up (POST)

authRouter.post('/sign-up', signUp); 

//path is /api/v1/auth/sign-in (POST)
authRouter.post('/sign-in', signIn); 

//path is /api/v1/auth/sign-out (POST)
authRouter.post('/sign-out', signOut); 

export default authRouter;
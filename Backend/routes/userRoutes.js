import {Router} from 'express';
import * as userController from '../controllers/userController.js';
import { body } from 'express-validator';
import { authUser } from '../middleware/authMid.js';
const router = Router();

router.post('/register',
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({min:3}).withMessage('Password must be at least 3 characters long'),
    userController.createUserController);

    router.post('/login',
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({min:3}).withMessage('Password must be at least 3 characters long'),
    userController.loginController);

    router.get('/profile', authUser, userController.profileController);

    router.get('/logout', authUser, userController.logOutController);
export default router;
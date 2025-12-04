import express from 'express';
import userRouter from './user.router';
import eventRouter from './event.router';


const router = express.Router();

router.use('/user', userRouter)
router.use('/event', eventRouter);

export default router;
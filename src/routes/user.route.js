import express from 'express';
import UserController from '../controllers/user.controller';
import { protectRoute } from '../middlewares/protect-route.middleware';

const router = express.Router();

router.get('/', protectRoute, UserController.findAllUsers);
router.get('/online', protectRoute, UserController.findOnlineUsers);
router.get('/search-user', protectRoute, UserController.searchUser);

export default router;

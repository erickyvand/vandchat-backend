import express from 'express';
import AuthController from '../controllers/auth.controller';
import {
	checkEmailDuplication,
	checkIfEmailExists,
	checkIfPasswordsMatch,
} from '../middlewares/user.middleware';
import {
	validateEmailBody,
	validatePasswordBody,
	validateSignupBody,
} from '../validations/user.validation';
import { protectRoute } from '../middlewares/protect-route.middleware';

const router = express.Router();

router.post(
	'/signup',
	validateSignupBody,
	checkEmailDuplication,
	AuthController.signup
);
router.post(
	'/email',
	validateEmailBody,
	checkIfEmailExists,
	AuthController.findEmailToLogin
);
router.post(
	'/password',
	protectRoute,
	validatePasswordBody,
	checkIfPasswordsMatch,
	AuthController.comparePasswordToLogin
);

export default router;

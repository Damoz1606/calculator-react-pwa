import { Router } from 'express';
import { verifyToken } from '../auth/auth';
import * as Controller from '../controller/calculator.controller';

const router = Router();

router.route("/signin")
.post(Controller.postSignin);

router.route("/signup")
.post(Controller.postSignup);

router.route("/")
.get(verifyToken, Controller.getUser)
.put(verifyToken, Controller.putUser);

router.route("/password")
.put(Controller.putPassword);

router.route("/history")
.post(verifyToken, Controller.postHistoryEntry)
.delete(verifyToken, Controller.deleteHistory);

router.route("/history/:historyID")
.put(verifyToken, Controller.putHistoryEntry)
.delete(verifyToken, Controller.deleteHistoryEntry);

export default router;
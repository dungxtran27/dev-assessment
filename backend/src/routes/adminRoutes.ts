import { Router, Request, Response, NextFunction } from "express";
import adminController from "../controllers/adminController";
import {
  validateRegister,
  validateCommonStudents,
  validateSuspend,
  validateRetrieveForNotifications,
} from "../middlewares/validation";

const router = Router();

router.post(
  "/register",
  validateRegister,
  (req: Request, res: Response, next: NextFunction) =>
    adminController.register(req, res).catch(next),
);
router.get(
  "/commonstudents",
  validateCommonStudents,
  (req: Request, res: Response, next: NextFunction) =>
    adminController.commonStudents(req, res).catch(next),
);
router.post(
  "/suspend",
  validateSuspend,
  (req: Request, res: Response, next: NextFunction) =>
    adminController.suspend(req, res).catch(next),
);
router.post(
  "/retrievefornotifications",
  validateRetrieveForNotifications,
  (req: Request, res: Response, next: NextFunction) =>
    adminController.retrieveForNotifications(req, res).catch(next),
);

export default router;

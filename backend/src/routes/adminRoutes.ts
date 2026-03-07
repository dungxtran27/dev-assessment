import { Router } from "express";
import adminController from "../controllers/adminController";

const router = Router();

router.post("/register", (req, res, next) =>
  adminController.register(req, res).catch(next),
);
router.get("/commonstudents", (req, res, next) =>
  adminController.commonStudents(req, res).catch(next),
);
router.post("/suspend", (req, res, next) =>
  adminController.suspend(req, res).catch(next),
);
router.post("/retrievefornotifications", (req, res, next) =>
  adminController.retrieveForNotifications(req, res).catch(next),
);

export default router;

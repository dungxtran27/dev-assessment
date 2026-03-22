import { Request, Response } from "express";
import adminService from "../services/adminService";
import errorHandlerMiddleware from "../middlewares/errorHandler";
import { extractMentionedEmails } from "../utils/validation";
import {
  NotificationRequest,
  RegisterRequest,
  SuspendRequest,
} from "../models/types";

const register = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as RegisterRequest;

  await adminService.registerStudents(body.teacher, body.students);
  res.status(204).send();
};

const commonStudents = async (req: Request, res: Response): Promise<void> => {
  const teachers = req.query.teacher as string[];
  const students = await adminService.getCommonStudents(teachers);
  res.status(200).json({ students });
};

const suspend = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as SuspendRequest;

  await adminService.suspendStudent(body.student);
  res.status(204).send();
};

const retrieveForNotifications = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const body = req.body as NotificationRequest;

  const mentionedEmails = extractMentionedEmails(body.notification);
  const recipients = await adminService.getNotificationRecipients(
    body.teacher,
    mentionedEmails,
  );
  res.status(200).json({ recipients });
};

const adminController = {
  register,
  commonStudents,
  suspend,
  retrieveForNotifications,
};

export default adminController;

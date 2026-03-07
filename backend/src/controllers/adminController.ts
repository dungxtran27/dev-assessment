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
  if (!body?.teacher || !body?.students) {
    throw new errorHandlerMiddleware.AppError(
      400,
      "teacher and students are required",
    );
  }

  await adminService.registerStudents(body.teacher, body.students);
  res.status(204).send();
};

const commonStudents = async (req: Request, res: Response): Promise<void> => {
  const teacherQuery = req.query.teacher;
  const teachers = Array.isArray(teacherQuery)
    ? teacherQuery
    : teacherQuery
      ? [teacherQuery]
      : [];
  const students = await adminService.getCommonStudents(teachers as string[]);
  res.status(200).json({ students });
};

const suspend = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as SuspendRequest;
  if (!body?.student) {
    throw new errorHandlerMiddleware.AppError(400, "student is required");
  }

  await adminService.suspendStudent(body.student);
  res.status(204).send();
};

const retrieveForNotifications = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const body = req.body as NotificationRequest;
  if (!body?.teacher || !body?.notification) {
    throw new errorHandlerMiddleware.AppError(
      400,
      "teacher and notification are required",
    );
  }

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

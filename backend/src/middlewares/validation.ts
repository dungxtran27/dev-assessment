import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import errorHandlerMiddleware from "./errorHandler";

// Validation middleware using Joi
export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body || req.query, {
      abortEarly: false,
    });
    if (error) {
      const errorMessages = error.details
        .map((detail) => detail.message)
        .join(", ");
      throw new errorHandlerMiddleware.AppError(
        400,
        `Validation errors: ${errorMessages}`,
      );
    }
    next();
  };
};

// Schemas
export const registerSchema = Joi.object({
  teacher: Joi.string().email().required(),
  students: Joi.array().items(Joi.string().email()).min(1).required(),
});

export const suspendSchema = Joi.object({
  student: Joi.string().email().required(),
});

export const notificationSchema = Joi.object({
  teacher: Joi.string().email().required(),
  notification: Joi.string().trim().required(),
});

export const commonStudentsQuerySchema = Joi.object({
  teacher: Joi.array().items(Joi.string().email()).min(1).required(),
});

// Middleware functions
export const validateRegister = validateRequest(registerSchema);
export const validateSuspend = validateRequest(suspendSchema);
export const validateRetrieveForNotifications =
  validateRequest(notificationSchema);

// For query validation, need to handle differently
export const validateCommonStudents = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const teachers = Array.isArray(req.query.teacher)
    ? req.query.teacher
    : req.query.teacher
      ? [req.query.teacher]
      : [];
  const { error } = Joi.array()
    .items(Joi.string().email())
    .min(1)
    .validate(teachers);
  if (error) {
    const errorMessages = error.details
      .map((detail) => detail.message)
      .join(", ");
    throw new errorHandlerMiddleware.AppError(
      400,
      `Validation errors: ${errorMessages}`,
    );
  }
  // Replace req.query.teacher with the array
  req.query.teacher = teachers;
  next();
};

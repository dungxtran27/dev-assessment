import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function notFoundHandler(
  _req: Request,
  _res: Response,
  next: NextFunction,
): void {
  next(new AppError(404, "Route not found"));
}

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // Log all errors for debugging
  // eslint-disable-next-line no-console
  console.error(`[${new Date().toISOString()}]`, {
    method: req.method,
    url: req.originalUrl,
    message: err.message,
    stack: err.stack,
  });

  if (err instanceof AppError) {
    // Client errors (4xx)
    if (err.statusCode >= 400 && err.statusCode < 500) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    // Server errors (5xx)
    res.status(500).json({ message: "Internal server error" });
    return;
  }

  // Unhandled errors
  res.status(500).json({ message: "Internal server error" });
}

const errorHandlerMiddleware = {
  AppError,
  notFoundHandler,
  errorHandler,
};

export default errorHandlerMiddleware;

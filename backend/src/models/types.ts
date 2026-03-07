export interface RegisterRequest {
  teacher: string;
  students: string[];
}

export interface SuspendRequest {
  student: string;
}

export interface NotificationRequest {
  teacher: string;
  notification: string;
}

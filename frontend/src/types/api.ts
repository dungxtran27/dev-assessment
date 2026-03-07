export interface RegisterPayload {
  teacher: string;
  students: string[];
}

export interface SuspendPayload {
  student: string;
}

export interface RetrieveForNotificationsPayload {
  teacher: string;
  notification: string;
}

export interface CommonStudentsResponse {
  students: string[];
}

export interface RecipientsResponse {
  recipients: string[];
}

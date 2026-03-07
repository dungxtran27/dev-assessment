import axios from "axios";
import {
  CommonStudentsResponse,
  RecipientsResponse,
  RegisterPayload,
  RetrieveForNotificationsPayload,
  SuspendPayload,
} from "../types/api";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export async function register(payload: RegisterPayload): Promise<void> {
  await api.post("/register", payload);
}

export async function getCommonStudents(
  teachers: string[],
): Promise<CommonStudentsResponse> {
  const params = new URLSearchParams();
  teachers.forEach((teacher) => params.append("teacher", teacher));

  const { data } = await api.get<CommonStudentsResponse>(
    `/commonstudents?${params.toString()}`,
  );
  return data;
}

export async function suspend(payload: SuspendPayload): Promise<void> {
  await api.post("/suspend", payload);
}

export async function retrieveForNotifications(
  payload: RetrieveForNotificationsPayload,
): Promise<RecipientsResponse> {
  const { data } = await api.post<RecipientsResponse>(
    "/retrievefornotifications",
    payload,
  );
  return data;
}

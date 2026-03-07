import { useState } from "react";
import { retrieveForNotifications } from "../services/api";
import { useApiCall } from "../hooks/useApiCall";

export const NotificationRecipients = () => {
  const [notificationTeacher, setNotificationTeacher] = useState(
    "teacherken@gmail.com",
  );
  const [notificationText, setNotificationText] = useState(
    "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com",
  );
  const [recipients, setRecipients] = useState<string[]>([]);
  const { execute, message } = useApiCall();

  const handleRetrieveRecipients = async (): Promise<void> => {
    await execute(
      () =>
        retrieveForNotifications({
          teacher: notificationTeacher.trim(),
          notification: notificationText,
        }),
      "Success: recipients retrieved",
      (data) => setRecipients(data.recipients),
    );
  };

  return (
    <article className="card">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
        User Story 4
      </p>
      <h2 className="mt-2 text-xl font-bold text-slate-900">
        Retrieve Notification Recipients
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        POST /api/retrievefornotifications
      </p>

      <div className="mt-4 space-y-3">
        <div>
          <label className="label" htmlFor="notification-teacher">
            Teacher email
          </label>
          <input
            className="input"
            id="notification-teacher"
            value={notificationTeacher}
            onChange={(event) => setNotificationTeacher(event.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="notification-text">
            Notification
          </label>
          <textarea
            className="input min-h-24"
            id="notification-text"
            value={notificationText}
            onChange={(event) => setNotificationText(event.target.value)}
            rows={3}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button className="button-primary" onClick={handleRetrieveRecipients}>
          Send Request
        </button>
        {message && (
          <span
            className={
              message.startsWith("Success") ? "status-ok" : "status-error"
            }
          >
            {message}
          </span>
        )}
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Recipients
        </p>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          {recipients.length === 0 && (
            <li className="text-slate-400">No result yet</li>
          )}
          {recipients.map((recipient) => (
            <li key={recipient} className="rounded-md bg-white px-2 py-1">
              {recipient}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

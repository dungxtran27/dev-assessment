import { useState } from "react";
import { suspend } from "../services/api";
import { useApiCall } from "../hooks/useApiCall";

export const SuspendStudent = () => {
  const [suspendStudentEmail, setSuspendStudentEmail] = useState(
    "studentmary@gmail.com",
  );
  const { execute, message } = useApiCall();

  const handleSuspend = async (): Promise<void> => {
    await execute(
      () => suspend({ student: suspendStudentEmail.trim() }),
      "Success: student suspended (HTTP 204)",
    );
  };

  return (
    <article className="card">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
        User Story 3
      </p>
      <h2 className="mt-2 text-xl font-bold text-slate-900">Suspend Student</h2>
      <p className="mt-1 text-sm text-slate-600">POST /api/suspend</p>

      <div className="mt-4">
        <label className="label" htmlFor="suspend-student">
          Student email
        </label>
        <input
          className="input"
          id="suspend-student"
          value={suspendStudentEmail}
          onChange={(event) => setSuspendStudentEmail(event.target.value)}
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button className="button-primary" onClick={handleSuspend}>
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
    </article>
  );
};

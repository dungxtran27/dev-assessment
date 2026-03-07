import { useState } from "react";
import { register } from "../services/api";
import { useApiCall } from "../hooks/useApiCall";

export const RegisterStudents = () => {
  const [registerTeacher, setRegisterTeacher] = useState(
    "teacherken@gmail.com",
  );
  const [registerStudents, setRegisterStudents] = useState(
    "studentjon@gmail.com,studenthon@gmail.com",
  );
  const { execute, message } = useApiCall();

  const parseCsvEmails = (value: string): string[] => {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const handleRegister = () => {
    const studentList = parseCsvEmails(registerStudents);
    execute(
      () =>
        register({ teacher: registerTeacher.trim(), students: studentList }),
      "Success: students registered (HTTP 204)",
    );
  };

  return (
    <article className="card">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
        User Story 1
      </p>
      <h2 className="mt-2 text-xl font-bold text-slate-900">
        Register Students
      </h2>
      <p className="mt-1 text-sm text-slate-600">POST /api/register</p>

      <div className="mt-4 space-y-3">
        <div>
          <label className="label" htmlFor="register-teacher">
            Teacher email
          </label>
          <input
            className="input"
            id="register-teacher"
            value={registerTeacher}
            onChange={(event) => setRegisterTeacher(event.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="register-students">
            Students (comma-separated)
          </label>
          <input
            className="input"
            id="register-students"
            value={registerStudents}
            onChange={(event) => setRegisterStudents(event.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button className="button-primary" onClick={handleRegister}>
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

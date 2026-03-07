import { useState } from "react";
import { getCommonStudents } from "../services/api";
import { useApiCall } from "../hooks/useApiCall";

export const CommonStudents = () => {
  const [commonTeachers, setCommonTeachers] = useState(
    "teacherken@gmail.com,teacherjoe@gmail.com",
  );
  const [students, setStudents] = useState<string[]>([]);
  const { execute, message } = useApiCall();

  const parseCsvEmails = (value: string): string[] => {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const handleLoadCommonStudents = async (): Promise<void> => {
    const teacherList = parseCsvEmails(commonTeachers);
    await execute(
      () => getCommonStudents(teacherList),
      "Success: common students loaded",
      (data) => setStudents(data.students),
    );
  };

  return (
    <article className="card">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
        User Story 2
      </p>
      <h2 className="mt-2 text-xl font-bold text-slate-900">
        Get Common Students
      </h2>
      <p className="mt-1 text-sm text-slate-600">GET /api/commonstudents</p>

      <div className="mt-4 space-y-3">
        <div>
          <label className="label" htmlFor="common-teachers">
            Teachers (comma-separated)
          </label>
          <input
            className="input"
            id="common-teachers"
            value={commonTeachers}
            onChange={(event) => setCommonTeachers(event.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button className="button-primary" onClick={handleLoadCommonStudents}>
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
          Students
        </p>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          {students.length === 0 && (
            <li className="text-slate-400">No result yet</li>
          )}
          {students.map((student) => (
            <li key={student} className="rounded-md bg-white px-2 py-1">
              {student}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

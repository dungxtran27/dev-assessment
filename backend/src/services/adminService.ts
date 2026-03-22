import pool from "../utils/db";
import errorHandlerMiddleware from "../middlewares/errorHandler";
import { isValidEmail } from "../utils/validation";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

const registerStudents = async (
  teacher: string,
  students: string[],
): Promise<void> => {
  const normalizedTeacher = normalizeEmail(teacher);

  const normalizedStudents = students.map((student) => normalizeEmail(student));

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Insert teacher if not exists
    await connection.execute("INSERT IGNORE INTO teachers (email) VALUES (?)", [
      normalizedTeacher,
    ]);

    // Insert students if not exist
    for (const student of normalizedStudents) {
      await connection.execute(
        "INSERT IGNORE INTO students (email) VALUES (?)",
        [student],
      );
    }

    // Insert teacher-student relationships
    for (const student of normalizedStudents) {
      await connection.execute(
        "INSERT IGNORE INTO teacher_student (teacher_email, student_email) VALUES (?, ?)",
        [normalizedTeacher, student],
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const getCommonStudents = async (teachers: string[]): Promise<string[]> => {
  const normalizedTeachers = teachers.map((teacher) => normalizeEmail(teacher));

  const connection = await pool.getConnection();
  try {
    const placeholders = normalizedTeachers.map(() => "?").join(",");
    const [rows] = await connection.execute(
      `
      SELECT s.email
      FROM students s
      WHERE s.suspended = FALSE
      AND (
        SELECT COUNT(DISTINCT ts.teacher_email)
        FROM teacher_student ts
        WHERE ts.student_email = s.email
        AND ts.teacher_email IN (${placeholders})
      ) = ?
      ORDER BY s.email
      `,
      [...normalizedTeachers, normalizedTeachers.length],
    );

    return (rows as any[]).map((row: any) => row.email);
  } finally {
    connection.release();
  }
};

const suspendStudent = async (student: string): Promise<void> => {
  const normalizedStudent = normalizeEmail(student);

  const connection = await pool.getConnection();
  try {
    // Insert student if not exists
    await connection.execute("INSERT IGNORE INTO students (email) VALUES (?)", [
      normalizedStudent,
    ]);

    // Update suspended status
    await connection.execute(
      "UPDATE students SET suspended = TRUE WHERE email = ?",
      [normalizedStudent],
    );
  } finally {
    connection.release();
  }
};

const getNotificationRecipients = async (
  teacher: string,
  mentionedEmails: string[],
): Promise<string[]> => {
  const normalizedTeacher = normalizeEmail(teacher);

  const connection = await pool.getConnection();
  try {
    const recipients = new Set<string>();

    // Get registered students under the teacher, not suspended
    const [registeredRows] = await connection.execute(
      `
      SELECT s.email
      FROM students s
      JOIN teacher_student ts ON s.email = ts.student_email
      WHERE ts.teacher_email = ?
      AND s.suspended = FALSE
      `,
      [normalizedTeacher],
    );
    (registeredRows as any[]).forEach((row: any) => recipients.add(row.email));

    // Normalize mentions
    const normalizedMentions = mentionedEmails
      .map((email) => normalizeEmail(email))
      .filter((email) => isValidEmail(email));

    if (normalizedMentions.length > 0) {
      // Batch query all mentioned emails at once
      const placeholders = normalizedMentions.map(() => "?").join(",");
      const [studentRows] = await connection.execute(
        `SELECT email, suspended FROM students WHERE email IN (${placeholders})`,
        normalizedMentions,
      );

      const suspendedMap = new Map<string, boolean>();
      (studentRows as any[]).forEach((row: any) =>
        suspendedMap.set(row.email, row.suspended),
      );

      // Add mentions if not suspended or not in DB
      for (const email of normalizedMentions) {
        const suspended = suspendedMap.get(email);
        if (suspended === undefined || suspended === false) {
          recipients.add(email);
        }
      }
    }

    return [...recipients].sort();
  } finally {
    connection.release();
  }
};

const clearDatabase = async (): Promise<void> => {
  const connection = await pool.getConnection();
  try {
    await connection.execute("DELETE FROM teacher_student");
    await connection.execute("DELETE FROM teachers");
    await connection.execute("DELETE FROM students");
  } finally {
    connection.release();
  }
};

const adminService = {
  registerStudents,
  getCommonStudents,
  suspendStudent,
  getNotificationRecipients,
  clearDatabase,
};

export default adminService;

-- Create tables
CREATE TABLE IF NOT EXISTS teachers (
  email VARCHAR(255) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
  email VARCHAR(255) PRIMARY KEY,
  suspended BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS teacher_student (
  teacher_email VARCHAR(255),
  student_email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (teacher_email, student_email),
  FOREIGN KEY (teacher_email) REFERENCES teachers(email) ON DELETE CASCADE,
  FOREIGN KEY (student_email) REFERENCES students(email) ON DELETE CASCADE
);

-- Clear existing data
DELETE FROM teacher_student;
DELETE FROM students;
DELETE FROM teachers;

-- Insert teachers
INSERT IGNORE INTO teachers (email) VALUES
('teacherken@gmail.com'),
('teacherjoe@gmail.com'),
('teachermay@gmail.com');

-- Insert students
INSERT IGNORE INTO students (email, suspended) VALUES
('studentbob@gmail.com', false),
('studentjohn@gmail.com', false),
('student_only_under_teacher_ken@gmail.com', false),
('studentjane@gmail.com', false),
('studentalice@gmail.com', false),
('studentcharlie@gmail.com', false),
('studentdavid@gmail.com', false),
('studentemma@gmail.com', false),
('studentfrank@gmail.com', false),
('commonstudent1@gmail.com', false),
('commonstudent2@gmail.com', false),
('commonstudent3@gmail.com', false),
('studentagnes@gmail.com', false),
('studentmiche@gmail.com', false),
('suspendedsudent@gmail.com', true);

-- Create relationships
INSERT IGNORE INTO teacher_student (teacher_email, student_email) VALUES
('teacherken@gmail.com', 'studentbob@gmail.com'),
('teacherken@gmail.com', 'studentjohn@gmail.com'),
('teacherken@gmail.com', 'student_only_under_teacher_ken@gmail.com'),
('teacherken@gmail.com', 'commonstudent1@gmail.com'),
('teacherken@gmail.com', 'commonstudent2@gmail.com'),
('teacherken@gmail.com', 'studentagnes@gmail.com'),
('teacherken@gmail.com', 'studentmiche@gmail.com'),
('teacherjoe@gmail.com', 'studentjane@gmail.com'),
('teacherjoe@gmail.com', 'studentalice@gmail.com'),
('teacherjoe@gmail.com', 'studentcharlie@gmail.com'),
('teacherjoe@gmail.com', 'commonstudent1@gmail.com'),
('teacherjoe@gmail.com', 'commonstudent2@gmail.com'),
('teacherjoe@gmail.com', 'commonstudent3@gmail.com'),
('teachermay@gmail.com', 'studentdavid@gmail.com'),
('teachermay@gmail.com', 'studentemma@gmail.com'),
('teachermay@gmail.com', 'studentfrank@gmail.com'),
('teachermay@gmail.com', 'commonstudent3@gmail.com');
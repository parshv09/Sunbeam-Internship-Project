CREATE DATABASE internship_project_db;

USE internship_project_db;

CREATE TABLE users (email VARCHAR(40) PRIMARY KEY, password varchar(40),role ENUM('student','admin'));

CREATE TABLE course(course_id INT PRIMARY KEY , course_name VARCHAR(40),description VARCHAR(100),fees INT,start_date DATE,end_date DATE, video_expiry_days INT);

CREATE TABLE students (
  reg_no INT PRIMARY KEY,
  name VARCHAR(25) NOT NULL,
  email VARCHAR(255) NOT NULL,
  course_id INT,
  mobile_number VARCHAR(20),
  profile_pic BLOB,
  CONSTRAINT fk_students_user_email FOREIGN KEY (email) REFERENCES users(email),
  CONSTRAINT fk_students_course FOREIGN KEY (course_id) REFERENCES course(course_id)
);

CREATE TABLE videos (
    video_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(100),
    description VARCHAR(255),
    youtube_url VARCHAR(255),
    added_at DATE,
    CONSTRAINT fk_co FOREIGN KEY (course_id) REFERENCES course(course_id)
);


INSERT INTO users (email, password, role) VALUES
('john@gmail.com', 'john123', 'student'),
('emma@gmail.com', 'emma123', 'student'),
('admin@gmail.com', 'admin123', 'admin');

INSERT INTO course (course_id, course_name, description, fees, start_date, end_date, video_expiry_days) VALUES
(101, 'Full Stack Development', 'Learn frontend + backend development.', 15000, '2025-01-10', '2025-04-10', 90),
(102, 'Data Science Bootcamp', 'Python, ML, Statistics, Projects', 18000, '2025-02-01', '2025-05-01', 120),
(103, 'Web Designing', 'HTML, CSS, JS and UI/UX basics', 8000, '2025-01-20', '2025-03-20', 60);

INSERT INTO students (reg_no, name, email, course_id, mobile_number, profile_pic) VALUES
(1, 'John Doe', 'john@gmail.com', 101, '9876543210', NULL),
(2, 'Emma Watson', 'emma@gmail.com', 102, '9123456780', NULL);

INSERT INTO videos (course_id, title, description, youtube_url, added_at) VALUES
(101, 'HTML Basics', 'Introduction to HTML', 'https://youtu.be/dD2EISBDjWM', '2025-01-12'),
(101, 'CSS Basics', 'Introduction to CSS styling', 'https://youtu.be/yfoY53QXEnI', '2025-01-13'),
(102, 'Python for Data Science', 'Python basics for beginners', 'https://youtu.be/_uQrJ0TkZlc', '2025-02-03'),
(103, 'UI/UX Intro', 'Basics of designing web experiences', 'https://youtu.be/C9Z0pXnOx0Q', '2025-01-25');
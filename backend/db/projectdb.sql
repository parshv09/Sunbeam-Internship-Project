CREATE DATABASE internship_project_db;
USE internship_project_db;

CREATE TABLE users (
  email VARCHAR(40) PRIMARY KEY,
  password VARCHAR(40),
  role ENUM('student','admin')
);

CREATE TABLE course (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  course_name VARCHAR(40),
  description VARCHAR(100),
  fees INT,
  start_date DATE,
  end_date DATE,
  video_expiry_days INT
) AUTO_INCREMENT = 101;


CREATE TABLE students (
  reg_no INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(25) NOT NULL,
  email VARCHAR(255) NOT NULL,
  course_id INT,
  mobile_number VARCHAR(20),
  profile_pic BLOB,
  CONSTRAINT fk_students_user_email 
    FOREIGN KEY (email) REFERENCES users(email),
  CONSTRAINT fk_students_course 
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

CREATE TABLE videos (
  video_id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  title VARCHAR(100),
  description VARCHAR(255),
  youtube_url VARCHAR(255),
  added_at DATE,
  CONSTRAINT fk_co 
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

INSERT INTO users (email, password, role) VALUES
('rahul.sharma@gmail.com', 'rahul123', 'student'),
('priya.patil@gmail.com', 'priya123', 'student'),
('amit.verma@gmail.com', 'amit123', 'student'),
('admin@sunbeam.in', 'admin123', 'admin');

INSERT INTO course 
(course_name, description, fees, start_date, end_date, video_expiry_days) VALUES
('Core Java Programming', 'Java fundamentals and OOP concepts', 30000,
 '2025-01-15', '2025-05-15', 60),

('Python for Data Science', 'Python, NumPy, Pandas, ML basics', 35000,
 '2025-02-01', '2025-06-01', 90),

('MERN Stack Development', 'MongoDB, Express, React, Node.js', 40000,
 '2025-03-01', '2025-08-01', 120);

INSERT INTO students
(name, email, course_id, mobile_number, profile_pic) VALUES
('Rahul Sharma', 'rahul.sharma@gmail.com', 101, '9876543210', NULL),
('Priya Patil', 'priya.patil@gmail.com', 102, '9123456789', NULL),
('Amit Verma', 'amit.verma@gmail.com', 103, '9988776655', NULL);


INSERT INTO videos
(course_id, title, description, youtube_url, added_at) VALUES
(101, 'Java Introduction', 'Overview of Java and JVM',
 'https://youtu.be/eIrMbAQSU34', '2025-01-16'),

(101, 'OOP Concepts', 'Encapsulation, Inheritance, Polymorphism',
 'https://youtu.be/BSVKUk58K6U', '2025-01-18'),

(102, 'Python Basics', 'Python syntax and variables',
 'https://youtu.be/rfscVS0vtbw', '2025-02-03'),

(103, 'React Introduction', 'React basics and JSX',
 'https://youtu.be/bMknfKXIFA8', '2025-03-05');

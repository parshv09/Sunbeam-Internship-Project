const express = require("express");
const cryptojs = require("crypto-js");
const router = express.Router();

const pool = require("../db/pool");
const result = require("../utils/result");

router.post("/register-to-course", (req, res) => {
  const { name, email, course_id, mobileNo } = req.body;

  if (!name || !email || !course_id || !mobileNo) {
    return res.send(result.createResult("name, email, course_id, mobileNo are required"));
  }

  const sql = `
    INSERT INTO students (name, email, course_id, mobile_number)
    VALUES (?, ?, ?, ?)
  `;

  pool.query(sql, [name, email, course_id, mobileNo], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

router.put("/change-password", (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const email = req.headers.email;

  if (!email) return res.send(result.createResult("email header is required"));
  if (!newPassword || !confirmPassword)
    return res.send(result.createResult("newPassword and confirmPassword are required"));

  if (newPassword !== confirmPassword) {
    return res.send(result.createResult("both new password and confirm password should be same"));
  }

  const hashPassword = cryptojs.SHA256(confirmPassword).toString();

  const sql = `UPDATE users SET password = ? WHERE email = ?`;

  pool.query(sql, [hashPassword, email], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

router.get("/my-courses", (req, res) => {
  const reg_no = req.query.reg_no;

  if (!reg_no) return res.send(result.createResult("reg_no query param is required"));

  const sql = `
    SELECT s.reg_no, s.name, c.course_name
    FROM students s
    JOIN course c ON c.course_id = s.course_id
    WHERE s.reg_no = ?
  `;

  pool.query(sql, [reg_no], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

router.get("/my-course-with-videos", (req, res) => {
  const reg_no = req.query.reg_no;

  if (!reg_no) return res.send(result.createResult("reg_no query param is required"));

  const sql = `
    SELECT 
      s.reg_no,
      s.name,
      c.course_name,
      v.video_id,
      v.title,
      v.description,
      v.youtube_url
    FROM students s
    JOIN course c ON c.course_id = s.course_id
    JOIN videos v ON v.course_id = c.course_id
    WHERE s.reg_no = ?
  `;

  pool.query(sql, [reg_no], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

module.exports = router;

import pool from "../config/db.js";

export async function createInquiry({ name, email, subject, message }) {
  const sql = `
    INSERT INTO contact_inquiries
      (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `;
  const params = [name, email, subject, message];
  const result = await pool.query(sql, params);
  return result.insertId;
}

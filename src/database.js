import mysql from "mysql2"

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST, //localhost
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()

export async function getBlogs() {
    const [rows] = await pool.query("SELECT * FROM posts")
    console.log(rows)
    return rows 
  }
  
  export async function getBlog(id){
      const [rows] = await pool.query(`
      SELECT * FROM posts
      WHERE id = ?
      `, [id])
      return rows[0]
  }
  
  export async function createBlog(image, title, subject, text){
    const [result] = await pool.query(`
    INSERT INTO posts (image, title, subject, text, created)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP())
    `, [image, title, subject, text])
    const id = result.insertId
    return getBlog(id) 
  }
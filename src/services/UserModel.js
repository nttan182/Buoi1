import pool from "../configs/database";
import { hashSync } from "bcrypt";
const getAllUsers = async () => {
  const [row, field] = await pool.execute("SELECT * FROM users");
  return row;
};
const addUser = async (data) => {
  const hashedPassword = hashSync(data.password, 10);
  const [row, field] = await pool.execute(
    "INSERT INTO `users` (`username`, `password`, `fullname`, `address`, `email`, `sex`) VALUES (?, ?, ?, ?, ?, ?)",
    [
      data.username,
      hashedPassword,
      data.fullname,
      data.address,
      data.email,
      data.sex,
    ]
  );
  return row;
};
const getUserByUsername = async (username) => {
  const [row, field] = await pool.execute(
    "SELECT * FROM `users` WHERE `username` = ?",
    [username]
  );
  return row;
};
const editUser = async (data) => {
  const [row, field] = await pool.execute(
    "UPDATE `users` SET `fullname`= ?, `address`= ?, `email`= ?, `sex`= ? WHERE `username` = ?",
    [data.fullname, data.address, data.email, data.sex, data.usernameEdit]
  );
  return row;
};
const deleteUser = async (username) => {
  const [row, field] = await pool.execute(
    "DELETE FROM `users` WHERE `username`= ?",
    [username]
  );
  return row;
};

export default {
  getAllUsers,
  addUser,
  getUserByUsername,
  editUser,
  deleteUser,
};

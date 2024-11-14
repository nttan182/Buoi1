import pool from "../configs/database";
import { hashSync } from "bcrypt";

const getAllGroups = async () => {
  const [row, fields] = await pool.execute("SELECT * FROM nhom");
  return row;
};
export default { getAllGroups };

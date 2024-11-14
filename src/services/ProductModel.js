import pool from "../configs/database";
import { hashSync } from "bcrypt";

const getAllProducts = async () => {
  const [row, fields] = await pool.execute("SELECT * FROM sanpham");
  return row;
};

const getDetailProduct = async (id) => {
  const [row, fields] = await pool.execute("SELECT * FROM sanpham WHERE id=?", [
    id,
  ]);
  return row;
};
export default { getAllProducts, getDetailProduct };

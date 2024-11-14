import { compare, compareSync, hashSync } from "bcrypt";
import userModel from "../services/userModel";
import User from "../models/User";

const getUserPage = async (req, res) => {
  const listUsers = await userModel.getAllUsers();
  res.render("main", {
    data: {
      title: "User Page",
      page: "viewUser",
      rows: listUsers,
    },
  });
};
const getAddUserPage = async (req, res) => {
  res.render("main", {
    data: {
      title: "Add User Page",
      page: "addUser",
    },
  });
};
const addUser = async (req, res) => {
  const data = req.body;
  await userModel.addUser(data);
  res.redirect("/user/viewAll");
};
const addUserByS = async (req, res) => {
  const data = req.body;
  const hashPassword = hashSync(data.password, 10);
  await User.create({
    username: data.username,
    password: hashPassword,
    fullname: data.fullname,
    address: data.address,
    sex: data.sex,
    email: data.email,
  });
  res.redirect("/user/viewAll");
};
const getEditUserPage = async (req, res) => {
  const { username } = req.params;
  const user = await userModel.getUserByUsername(username);
  res.render("main", {
    data: {
      title: "Edit User Page",
      page: "editUser",
      user: user[0],
    },
  });
};
const editUser = async (req, res) => {
  const data = req.body;
  await userModel.editUser(data);
  res.redirect("/user/viewAll");
};
const deleteUser = async (req, res) => {
  const { username } = req.body;
  await userModel.deleteUser(username);
  if (username == req.session.username) {
    req.session.deleteUser();
  }
  res.redirect("/user/viewAll");
};
const deleteUserByS = async (req, res) => {
  const { username } = req.body;
  await User.destroy({
    where: { username: username },
  });
  if (username == req.session.username) {
    req.session.destroy();
  }
  res.redirect("/user/viewAll");
};
const getDetailUserPage = async (req, res) => {
  const { username } = req.params;
  const user = await userModel.getUserByUsername(username);
  res.render("main", {
    data: {
      title: "Detail User Page",
      page: "detailUser",
      user: user[0],
    },
  });
};

const getLoginPage = async (req, res) => {
  res.render("main", {
    data: {
      title: "Login Page",
      page: "login",
    },
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.getUserByUsername(username);
  if (user.length == 0) {
    res.redirect("/login");
    return;
  }
  const isCheck = compareSync(password, user[0].password);
  if (!isCheck) {
    res.redirect("/login");
    return;
  }
  req.session.user = user[0];
  req.session.username = user[0].username;
  req.session.isAuth = true;
  req.session.role = user[0].role;
  res.redirect("/user/viewAll");
};

const logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
export default {
  getUserPage,
  getAddUserPage,
  addUser,
  addUserByS,
  getEditUserPage,
  editUser,
  deleteUser,
  deleteUserByS,
  getDetailUserPage,
  getLoginPage,
  login,
  logout,
};

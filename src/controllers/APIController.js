import userModel from "../services/userModel";

const getAllUsers = async (req, res) => {
  let users = await userModel.getAllUsers();
  return res.status(200).json({
    status: "success",
    users: users,
  });
};

const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  let user = await userModel.getUserByUsername(username);
  if (user.length == 0) {
    return res.status(404).json({
      status: "error",
      user: null,
    });
  }
  return res.status(200).json({
    status: "success",
    user: user[0],
  });
};

const addUser = async (req, res) => {
  const data = req.body;
  const user = await userModel.getUserByUsername(data.username);
  if (user.length != 0) {
    return res.status(403).json({
      status: "error",
      message: "Username đã tồn tại",
    });
  }
  await userModel.addUser(data);
  return res.status(200).json({
    status: "success",
    message: "Tạo tài khoản thành công",
  });
};

const editUser = async (req, res) => {
  const data = req.body;
  await userModel.editUser(data);
  return res.status(200).json({
    status: "success",
    message: "Sửa tài khoản thành công",
  });
};

const deleteUser = async (req, res) => {
  const { username } = req.body;
  await userModel.deleteUser(username);
  return res.status(200).json({
    status: "success",
    message: "Xóa tài khoản thành công",
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.getUserByUsername(username);
  if (user.length == 0) {
    return res.status(403).json({
      status: "error",
      message: "Sai thông tin đăng nhập",
    });
  }
  const isCheck = compareSync(password, user[0].password);
  if (!isCheck) {
    if (user.length == 0) {
      return res.status(403).json({
        status: "error",
        message: "Sai thông tin đăng nhập",
      });
    }
    req.session.user = user[0];
    req.session.username = user[0].username;
    req.session.isAuth = true;
    req.session.role = user[0].role;
    return res.status(200).json({
      status: "success",
      message: "Đăng nhập thành công",
    });
  }
};

const logout = async (req, res) => {
  req.session.destroy();
  return res.status(200).json({
    status: "success",
    message: "Đăng xuất thành công",
  });
};

export default {
  getAllUsers,
  getUserByUsername,
  addUser,
  editUser,
  deleteUser,
  login,
  logout,
};

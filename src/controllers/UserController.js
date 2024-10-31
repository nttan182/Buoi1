import { compare } from "bcrypt";
import userModel from "../services/userModel";

const getUserPage = async (req, res) => {
    const listUsers = await userModel.getAllUsers();
    res.render("main",{
        data: {
            title: "User Page",
            page: "viewUser",
            rows: listUsers,
        }
    })
}
const getAddUserPage = async (req, res) => {
    res.render("main",{
        data: {
            title: "Add User Page",
            page: "addUser",
        }
    })
}
const addUser = async(req, res) => {
    const data = req.body;
    await userModel.addUser(data);
    res.redirect("/user/viewAll")
}
const getEditUserPage = async (req, res) => {
    const {username} = req.params;
    const user = await userModel.getUserByUsername(username)
    res.render("main", {
        data:{
            title: "Edit User Page",
            page: "editUser",
            user: user[0]
        }
    })
}
const editUser = async (req, res) => {
    const data = req.body;
    await userModel.editUser(data)
    res.redirect("/user/viewAll")
}
const deleteUser = async (req, res) => {
    const {username} = req.body
    await userModel.deleteUser(username);
    res.redirect("/user/viewAll")
}
const getDetailUserPage = async (req, res) => {
    const {username} = req.params;
    const user = await userModel.getUserByUsername(username)
    res.render("main",{
        data:{
            title: "Detail User Page",
            page: "detailUser",
            user: user[0]
        }
    })
}

const getLoginPage = async (req, res) => {
    res.render("main",{
    data:{
        title: "Login Page",
        page: "login",
        }    
    })
}

const login = async (req, res) => {
    const {username, password} = req.body;
    const user = await userModel.getUserByUsername(username);
    if (user.length == 0){
        res.redirect("/login");
        return;
    }
    const isCheck = compareSync(password, user[0].password);
    if (isCheck){
        res.redirect("/login")
        return;
    }
    req.session.user = user[0];
    req.session.isAuth = true;
    req.session.role = user[0].role;
    res.redirect("/viewAll")
}
export default {getUserPage, getAddUserPage, addUser, getEditUserPage, editUser, deleteUser, getDetailUserPage, getLoginPage, login}
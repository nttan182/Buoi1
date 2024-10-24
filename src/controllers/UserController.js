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
export default {getUserPage, getAddUserPage, addUser, getEditUserPage, editUser, deleteUser, getDetailUserPage}
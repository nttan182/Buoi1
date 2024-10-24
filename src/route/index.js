import { getHomePage } from "../controllers/HomeController";
import { getAboutPage } from "../controllers/AboutController";
import { getContactPage } from "../controllers/ContactController";
import UserController from "../controllers/UserController";
const initWebRouters = (app) => {
    app.get("/", getHomePage);
    app.get("/about", getAboutPage);
    app.get("/contact", getContactPage);
    app.get("/user/viewAll", UserController.getUserPage);
    app.get("/user/add", UserController.getAddUserPage);
    app.post("/api/addUser", UserController.addUser);
    app.get("/user/edit/:username", UserController.getEditUserPage);
    app.post("/api/editUser", UserController.editUser);
    app.post("/api/deleteUser", UserController.deleteUser);
    app.get("/user/view/:username", UserController.getDetailUserPage);
}
export default initWebRouters;
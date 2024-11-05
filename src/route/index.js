import { getHomePage } from "../controllers/HomeController";
import { getAboutPage } from "../controllers/AboutController";
import { getContactPage } from "../controllers/ContactController";
import UserController from "../controllers/UserController";
import globalVarilables from "../middlewares/globalVarilables";
import auth from "../middlewares/auth";
import apiController from "../controllers/APIController";

const initWebRouters = (app) => {
  app.use(globalVarilables);
  app.get("/", getHomePage);
  app.get("/about", getAboutPage);
  app.get("/contact", getContactPage);
  app.get("/user/viewAll", UserController.getUserPage);
  app.get("/user/add", UserController.getAddUserPage);
  app.post("/api/addUser", UserController.addUser);
  app.get("/login", UserController.getLoginPage);
  app.post("/api/login", UserController.login);
  app.get("/logout", UserController.logout);

  app.get(
    "/user/edit/:username",
    auth.isMineOrAdmin,
    UserController.getEditUserPage
  );
  app.post(
    "/api/editUser/:username",
    auth.isMineOrAdmin,
    UserController.editUser
  );
  app.post(
    "/api/deleteUser/:username",
    auth.isMineOrAdmin,
    UserController.deleteUser
  );
  app.get(
    "/user/view/:username",
    auth.isMineOrAdmin,
    UserController.getDetailUserPage
  );
  app.get("/api/v1/getAllUsers", apiController.getAllUsers);
  app.get("/api/v1/logout", apiController.logout);
  app.get(
    "/api/v1/getUserByUsername/:username",
    apiController.getUserByUsername
  );
  app.post("/api/v1/addUser", apiController.addUser);
  app.post("/api/v1/editUser/:username", apiController.editUser);
  app.post("/api/v1/deleteUser/:username", apiController.deleteUser);
  app.post("/api/v1/login", apiController.login);
};
export default initWebRouters;

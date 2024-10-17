import { getHomePage } from "../controllers/HomeController";
import { getAboutPage } from "../controllers/AboutController";
import { getContactPage } from "../controllers/ContactController";

const initWebRouters = (app) => {
    app.get("/", getHomePage);
    app.get("/about", getAboutPage);
    app.get("/contact", getContactPage);
}
export default initWebRouters;
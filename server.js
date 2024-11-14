import path from "path";
import express from "express";
import dotenv from "dotenv/config";
import viewEngine from "./viewEngine";
import initWebRouters from "./src/route";
import bodyParser from "body-parser";
import session from "express-session";
import { createClient } from "redis";
import RedisStore from "connect-redis";
import sequelize from "./src/configs/sequelize";

const app = express();

const redisClient = createClient({
  password: "zRl7JIEBVKrxTJ9r3IDoa7lywqB5MOAc",
  socket: {
    host: "redis-15849.c295.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port: 15849,
  },
});
redisClient.connect().catch(console.error);
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});
app.use(
  session({
    store: redisStore,
    secret: "hehe ahhe hahehheehehhe",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
sequelize
  .sync({
    force: false,
  })
  .then(() => {
    console.log("Sequelize - Cơ sở dữ liệu đã được tạo");
  });
viewEngine(app);
const port = process.env.PORT;
app.set("views", path.join(__dirname, "src", "views"));
app.use(bodyParser.urlencoded({ extended: true }));
initWebRouters(app);
app.listen(port, () => {
  console.log("Example app listening on port ${port}");
});

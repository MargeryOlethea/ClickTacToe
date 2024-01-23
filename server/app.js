if (process.env.NODE_ENV !== "production") {
  require(`dotenv`).config();
}

const express = require("express");
const cors = require(`cors`);
const Controller = require("./controllers/controller");
const errorHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/authentication");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", Controller.register);
app.post("/login", Controller.login);

app.use(authentication)
// app.get("/rooms");
// app.post("/rooms");
// app.put("/rooms/:RoomId");
// app.put("/user/:UserId");
// app.get("/user");
// app.get("/mygames");
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

if (process.env.NODE_ENV !== "production") {
  require(`dotenv`).config();
}

const express = require("express");
const cors = require(`cors`);
const Controller = require("./controllers/controller");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.post("/register");
// app.post("login");
app.post("/rooms", Controller.createRooms);
app.get("/rooms", Controller.readRooms);
app.patch("/rooms/:RoomId/join", Controller.joinPlayer);
app.put("/rooms/:RoomId", Controller.updateRooms);
app.put("/user/:UserId", Controller.updateUser);
app.get("/user", Controller.readUsers);
app.get("/mygames", Controller.readMyRooms);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

if (process.env.NODE_ENV !== "production") {
  require(`dotenv`).config();
}

const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require(`cors`);
const Controller = require("./controllers/controller");
const errorHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/authentication");
const joinAuthorization = require("./middlewares/joinauthorization");
const app = express();
const port = 3000;

app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.SOCKET_CORS_URL },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", Controller.register);
app.post("/login", Controller.login);

app.use(authentication);
app.post("/rooms", Controller.createRooms);
app.get("/rooms", Controller.readRooms);
app.get("/rooms/:RoomId", Controller.readRoomsById);
app.patch("/rooms/:RoomId/join", joinAuthorization, Controller.joinPlayer);
app.put("/rooms/:RoomId", Controller.updateRooms);
app.put("/user/:UserId", Controller.updateUser);
app.get("/user", Controller.readUsers);
app.get("/mygames", Controller.readMyRooms);

app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("a user connected " + socket.id);
});

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

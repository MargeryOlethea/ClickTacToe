const { Op } = require("sequelize");
const { User, Room } = require(`../models`);
const { comparePassword } = require("../utils/hash");
const { createToken } = require("../utils/token");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, password, totalWin, totalPlay } = req.body;

      const user = await User.create({
        username,
        password,
        totalWin,
        totalPlay,
      });

      res.status(201).json({
        message: "Success create new user",
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw { name: "LoginInputError" };
      }

      const foundUser = await User.findOne({
        where: { username },
      });

      if (!foundUser) {
        throw { name: "InvalidCredential" };
      }

      const correctUser = comparePassword(password, foundUser.password);

      if (!correctUser) {
        throw { name: "InvalidCredential" };
      }

      const payload = {
        id: foundUser.id,
        username: foundUser.username,
      };

      const token = createToken(payload);

      res
        .status(200)
        .json({ access_token: token, username: foundUser.username });
    } catch (error) {
      next(error);
    }
  }

  static async createRooms(req, res, next) {
    try {
      const { userId, username } = req.loginInfo;
      const { name, status, password } = req.body;

      if (status === "Private" && !password)
        throw new Error(`no room password`);
      let data = await Room.create({
        name,
        status,
        password,
        FirstUserId: userId,
        turn: username,
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async readRooms(req, res, next) {
    try {
      const { filter } = req.query;

      let query = {
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            as: "FirstUser",
            attributes: { exclude: ["password"] },
          },
          {
            model: User,
            as: "SecondUser",
            attributes: { exclude: ["password"] },
          },
        ],
      };
      if (filter) query.where = { SecondUserId: null };

      let data = await Room.findAll(query);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async readRoomsById(req, res, next) {
    try {
      const { RoomId } = req.params;

      let roomFound = await Room.findByPk(RoomId);
      if (!roomFound) throw new Error("not found");

      res.status(200).json(roomFound);
    } catch (error) {
      next(error);
    }
  }

  static async joinPlayer(req, res, next) {
    try {
      let { userId } = req.loginInfo;
      let { RoomId } = req.params;
      let { password } = req.body;

      let roomFound = await Room.findByPk(RoomId);

      if (roomFound.status === "Private" && roomFound.password !== password)
        throw new Error("wrong password");

      if (roomFound.FirstUserId === userId) {
        res.status(200).json({ message: "Masuk aja" });
      } else {
        await Room.update({ SecondUserId: userId }, { where: { id: RoomId } });
        let data = await Room.findByPk(RoomId);
        res.status(200).json(data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateRooms(req, res, next) {
    try {
      let { userId } = req.loginInfo;
      let { RoomId } = req.params;

      let room = await Room.findByPk(RoomId, {
        include: [
          {
            model: User,
            as: "FirstUser",
            attributes: { exclude: ["password"] },
          },
          {
            model: User,
            as: "SecondUser",
            attributes: { exclude: ["password"] },
          },
        ],
      });

      let { history, winner } = req.body;

      if (userId === room.FirstUserId) {
        await Room.update(
          {
            history,
            winner,
            turn: room.SecondUser.username,
          },
          { where: { id: RoomId } },
        );
      } else {
        await Room.update(
          {
            history,
            winner,
            turn: room.FirstUser.username,
          },
          { where: { id: RoomId } },
        );
      }

      room = await Room.findByPk(RoomId);

      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      let { UserId } = req.params;
      let { match } = req.body;

      let userFound = await User.findByPk(UserId);

      if (match === "win")
        await User.update(
          {
            totalPlay: userFound.totalPlay + 1,
            totalWin: userFound.totalWin + 1,
          },
          { where: { id: UserId } },
        );

      if (match === "lose" || match === "tie")
        await User.update(
          {
            totalPlay: userFound.totalPlay + 1,
          },
          { where: { id: UserId } },
        );

      userFound = await User.findByPk(UserId);
      res.status(200).json(userFound);
    } catch (error) {
      next(error);
    }
  }

  static async readUsers(req, res, next) {
    try {
      let data = await User.findAll({
        order: [
          ["totalWin", "DESC"],
          ["totalPlay", "ASC"],
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async readMyRooms(req, res, next) {
    try {
      let { userId } = req.loginInfo;

      let data = await Room.findAll({
        where: {
          [Op.or]: [
            {
              FirstUserId: userId,
            },
            {
              SecondUserId: userId,
            },
          ],
        },
        // include: [
        //   {
        //     model: User,
        //     as: "FirstUser",
        //     attributes: { exclude: ["password"] },
        //   },
        //   {
        //     model: User,
        //     as: "SecondUser",
        //     attributes: { exclude: ["password"] },
        //   },
        // ],
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;

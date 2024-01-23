const { Op } = require("sequelize");
const { User, Room } = require(`../models`);

class Controller {
  static async createRooms(req, res, next) {
    try {
      const id = 1;
      const username = "user";
      //ganti jadi dari login info
      const { name, status, password } = req.body;
      if (status === "Private" && !password)
        throw new Error(`no room password`);
      let data = await Room.create({
        name,
        status,
        password,
        FirstUserId: id,
        turn: username,
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async readRooms(req, res, next) {
    try {
      let data = await Room.findAll({ order: [["createdAt", "DESC"]] });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async joinPlayer(req, res, next) {
    try {
      let UserId = 2;
      //dari req.loginInfo
      let { RoomId } = req.params;
      await Room.update({ SecondUserId: UserId }, { where: { id: RoomId } });
      let data = await Room.findByPk(RoomId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async updateRooms(req, res, next) {
    try {
      let UserId = 1;
      //dari login
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

      if (UserId === room.FirstUserId) {
        await Room.update(
          {
            history,
            winner,
            turn: room.SecondUser.username,
          },
          { where: { id: RoomId } }
        );
      } else {
        await Room.update(
          {
            history,
            winner,
            turn: room.FirstUser.username,
          },
          { where: { id: RoomId } }
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
      //dari params
      let { match } = req.body;

      let userFound = await User.findByPk(UserId);

      if (match === "win")
        await User.update(
          {
            totalPlay: userFound.totalPlay + 1,
            totalWin: userFound.totalWin + 1,
          },
          { where: { id: UserId } }
        );

      if (match === "lose" || match === "tie")
        await User.update(
          {
            totalPlay: userFound.totalPlay + 1,
          },
          { where: { id: UserId } }
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
      let UserId = 2;
      //dapet dari login

      let data = await Room.findAll({
        where: {
          [Op.or]: [
            {
              FirstUserId: UserId,
            },
            {
              SecondUserId: UserId,
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

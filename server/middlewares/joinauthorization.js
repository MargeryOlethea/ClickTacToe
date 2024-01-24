const { Room } = require(`../models`);

const joinAuthorization = async (req, res, next) => {
  try {
    let { userId } = req.loginInfo;
    let { RoomId } = req.params;

    let roomFound = await Room.findByPk(RoomId);

    if (
      roomFound.SecondUserId &&
      roomFound.SecondUserId !== userId &&
      roomFound.FirstUserId !== userId
    )
      throw new Error("forbidden");
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = joinAuthorization;

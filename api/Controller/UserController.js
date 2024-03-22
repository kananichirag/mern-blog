const { json } = require("express");
const User = require("../model/UserModal");
const bcryptjs = require("bcryptjs");

const UpdateUser = async (req, res) => {
  if (req.user.id != req.params.id) {
    return res.json({ success: false, msg: "You are not Allow to do that.!!" });
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res.json({
        success: false,
        msg: "Password must be 6 character long.!!",
      });
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username > 20) {
      return res.json({
        success: false,
        msg: "Username must be between 7 and 20 character..!!",
      });
    }
    if (req.body.username.includes(" ")) {
      return res.json({
        success: false,
        msg: "Username cannot contain spaces.!!",
      });
    }
  }
  try {
    const updateuser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profile: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateuser._doc;
    res.json({ success: true, msg: "User Update Successfully.!!", user: rest });
  } catch (error) {
    console.log(error);
  }
};

const DeleteUser = async (req, res, next) => {
  if (req.user.id != req.params.id) {
    res.json({
      success: false,
      msg: "You are not allow to Delete this user..!!",
    });
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, msg: "User has been Deleted.!!" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  UpdateUser,
  DeleteUser,
};

const User = require("../model/UserModal");
const bcryptjs = require("bcryptjs");

const SignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      password === "" ||
      email === ""
    ) {
      return res
        .status(400)
        .json({ success: false, msg: "All Fields are required...!!!" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newuser = new User({ username, email, password: hashedPassword });
    await newuser.save();
    res.json({
      success: true,
      msg: "User Created Successfully..!!!",
    });
  } catch (error) {
    res.json({
      success: false,
      msg: "Error In SignUp..!!",
      error,
    });
  }
};

module.exports = {
  SignUp,
};
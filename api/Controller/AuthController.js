const User = require("../model/UserModal");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    const checkuser = await User.findOne({ email, username });
    if (checkuser) {
      return res.json({
        success: false,
        msg: "Email Alredy Registred..!!",
      });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newuser = new User({ username, email, password: hashedPassword });
    await newuser.save();
    res.json({
      success: true,
      msg: "User Created Successfully..!!!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      msg: "Username Already Registred..!!",
      error,
    });
  }
};

const SignIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({
      success: false,
      msg: "All Fields are required.!!",
    });
  }
  try {
    const validuser = await User.findOne({ email });
    if (!validuser) {
      return res.status(404).json({
        success: false,
        msg: "User not Found..!!",
      });
    }

    const validPassword = bcryptjs.compareSync(password, validuser.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        msg: "Invalid Password..!!",
      });
    }

    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET_KEY);
    const { password: pass, ...rest } = validuser._doc;
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({ success: true, msg: "Sign-In Successfully..!!", user: rest });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      msg: "Error to Sign-In..!!",
      error,
    });
  }
};

const GoogleAuth = async (req, res) => {
  const { name, email, googlePhotoURL } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({ success: true, msg: "Sign-in Successfully.!!", user: rest });
    } else {
      const genratePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(genratePassword, 10);
      const newuser = await User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email: email,
        password: hashPassword,
        profile: googlePhotoURL,
      });
      await newuser.save();
      const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET_KEY);
      const { password, ...rest } = newuser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({ success: true, msg: "Sign-in Successfully.!!", user: rest });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      msg: "Error to Sign-In with Google..!!",
      error,
    });
  }
};

module.exports = {
  SignUp,
  SignIn,
  GoogleAuth,
};

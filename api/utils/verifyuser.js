const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.json({ success: false, msg: "Unauthorized.!!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.json({ success: false, msg: "unauthorized.!" });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  verifyToken,
};

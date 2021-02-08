const User = require("./User");
const jwt = require("jsonwebtoken");

const unauthorize = res =>
  res.status(401).send({
    error: {
      message: "UNAUTHORIZED"
    }
  });

async function verifyWebToken(token) {
  const payload = jwt.decode(token);
  if (!payload) {
    throw new Error("Invalid token");
  }

  const user = await User.findOne({ _id: payload._id });
  if (!user) {
    throw new Error("Invalid token");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
}

async function isAuthed(req, res, next) {
  res.locals.user = null;

  const authorization = req.get("Authorization");
  if (!authorization) return unauthorize(res);

  const token = authorization.replace("Bearer ", "");
  if (!token) return unauthorize(res);

  let payload = null;
  try {
    payload = await verifyWebToken(token);
  } catch (err) {
    console.log(err)
    return unauthorize(res);
  }

  res.locals.user = payload;

  next();
}

module.exports = isAuthed;

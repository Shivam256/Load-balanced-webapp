import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/user.model.js';
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({
      ok: false,
      message: 'access denied, no token',
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode._id);
    if (!user) {
      return res.status(400).json({
        ok: false,
        message: 'access denied, no user',
      });
    }

    req.user = user;
    next();
  } catch (e) {
    //console.log(e);
    return res.status(400).send(err.message);
  }
};
export default authMiddleware;

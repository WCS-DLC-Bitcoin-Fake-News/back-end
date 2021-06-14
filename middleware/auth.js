import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded.user;
      next();
    } catch (error) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  } else {
    res.status(401).json({ msg: "No token, authorization denied" });
  }
};

export default auth;

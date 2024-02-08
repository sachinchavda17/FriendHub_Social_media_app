import jwt from "jsonwebtoken";

export const varifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      res.status(403).send("Access Denied");
    }
    if (token.startWith("Bearer ")) {
      token = token.slice(7, token.length()).trinLeft();

    }
    const varified = jwt.varify(token,process.env.JWT_SECRET)
    req.user = varified
    nect()
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

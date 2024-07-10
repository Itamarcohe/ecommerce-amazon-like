import jwt from "jsonwebtoken";

const generateToken = ({ _id, name, email }) => {
  try {
    return jwt.sign({ _id, name, email }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  } catch (error) {
    console.error("Error generating JWT:", error);
    return null;
  }
};

const isAuth = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).send({ message: "No token provided" });
  }

  const token = auth.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

export { generateToken, isAuth };

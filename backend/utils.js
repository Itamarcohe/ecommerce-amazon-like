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

export { generateToken };

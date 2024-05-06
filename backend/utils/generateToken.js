import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  // Calculate the number of milliseconds in 2 days
  const twoDaysInSeconds = 2 * 24 * 60 * 60; // 2 days in seconds
  const maxAgeMilliseconds = twoDaysInSeconds * 1000; // Convert to milliseconds

  res.cookie("jwt", token, {
    maxAge: maxAgeMilliseconds,
    httpOnly: true, //prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", //CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;

import jwt from "jsonwebtoken";
export const checkAuth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    
    jwt.verify(token, "123456", (error, data) => {
      if (error) {
        if (error.name == "TokenExpiredError") {
          return res.json({ message: "Token het han" });
        } else if (error.name == "JsonWebTokenError") {
          return res.json({ message: "Token khong hop le" });
        }
      }
      next()
    });
  }
};

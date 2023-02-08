import { Handler } from "express";
import jwt from "jsonwebtoken";

export const authentify: Handler = async (req: any, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authorization.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authorize: (...roles: string[]) => Handler =
  (...roles) =>
  (req: any, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(user.role)) {
      console.log(user.role, roles);

      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };

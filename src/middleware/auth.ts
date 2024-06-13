import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";

interface AuthRequest extends Request {
  user?: null;
}

export default function (req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    jwt.verify(token, config.jwtSecret, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token is not valid" });
      } else {
        User.findById(decoded._id).then((user: any) => {
          req.user = user;
          next();
        }).catch(() => {
          return res.status(401).json({ msg: "Token is not valid" });
        });
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
}

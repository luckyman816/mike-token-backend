import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: {
    role?: null
  };
}

export default function (req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.user) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    } else if (req.user.role !== "admin") {
        return res.status(400).json({ msg: "No token, authorization denied" });
    } else {
        next();
    }
}

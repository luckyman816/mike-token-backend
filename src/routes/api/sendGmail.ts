import express, { Router, Request, Response } from "express";
import User from "../../models/User";
import auth from "../../middleware/auth";
import nodemailer from "nodemailer";

const router: Router = express.Router();

interface AuthRequest extends Request {
  user?: {
    _id: string;
    role: string;
    status: string;
  };
}

router.post("/send/:gmail", async (req: Request, res: Response) => {
  const gmail =  req.params.gmail;
  const mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "smart163410@gmail.com",
      pass: "gdobzmpamouonfjg",
    },
  });

  try {
    const res = await mailTransporter.sendMail({
      from: "smart163410@gmail.com",
      to: gmail,
      subject: "Email Verification",
      html: "Invite my performance system website(url: https://perf-sys-frontend.vercel.app/)",
    });
    console.log(res);
   
  } catch(error) {
    console.log(error);
  }
});

export default router;

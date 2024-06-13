import express, { Router, Request, Response } from "express";
import {
  check,
  validationResult,
  ValidationError,
  Result,
} from "express-validator";
import User from "../../models/User";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import auth from "../../middleware/auth";

const router: Router = express.Router();

// route: api/user/register
// description: user register
// method: POST and it's public
interface AuthRequest extends Request {
  user?: {
    _id: string;
    role: string;
    status: string;
  };
}
router.post(
  "/register",
  [
    check("username", "username is required").notEmpty(),
    check("password", "Password length should be 6 to 40 characters").isLength({
      min: 6,
      max: 40,
    }),
    check("email", "email must be required").notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "Email already exists" }] });
    }
    const currentDate = new Date();
    let amount = (await User.find()).length;
    if(amount === 0){
      user = new User({
        ...req.body,
        role: "admin",
        status: "verified",
        date: currentDate,
      });
    } else {
      user = new User({
        ...req.body,
        role: "user",
        status: "verified",
        date: currentDate,
      });
    }
    user.password = user.encryptPassword(user.password);

    await user.save();

    res.json({ msg: "Successfully registered" });
  }
);
// route: api/user/login
// description: user login and return jwt
// method: POST and it's public
router.post(
  "/login",
  [
    check("username", "Username is required").notEmpty(),
    check("password", "Password is required").notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ errors: [{ msg: "User not found" }] });
    }

    const compare = compareSync(password, user.password);
    if (!compare) {
      return res.status(400).json({ errors: [{ msg: "Password incorrect" }] });
    }
    const payload = {
      _id: user._id,
      username,
      role: user.role,
      status: user.status,
    };
    jwt.sign(
      payload,
      config.jwtSecret,
      { expiresIn: "1 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token: token, user });
      }
    );
  }
);

// route: api/user/auth
// description: currnet user's info
// method: get and it's private
router.get("/auth", auth, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select(["-password"]);
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// route: api/user/all
// description: currnet user's info
// method: get and it's private only for admin
router.get("/all", auth, async (req: AuthRequest, res: Response) => {
  if (req.user.role !== "admin") {
    return res
      .status(400)
      .json({ msg: "You don't have permission to get data" });
  }
  const users = await User.find().sort("firstname");
  res.json(users);
});

router.get("/getid/all", auth, async (req: AuthRequest, res: Response) => {
  if (req.user.role !== "admin") {
    return res
      .status(400)
      .json({ msg: "You don't have permission to get data" });
  }
  const users = await User.find()
    .select(["_id", "email", "role"])
    .sort({ groupid: "asc" });

  res.json(users);
});

// route: api/user/update
// description: update user's info
// method: Put and it's private only for admin
router.put("/update", auth, async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.body.id);
  if (!user) return res.status(404).json({ msg: "User Not Found" });
  if (req.user.role === "admin" || req.user._id === user._id.toString()) {
    if (req.user.role !== "admin") {
      const { email } = req.body;
      let userByEmail = await User.findOne({ email });
      if (userByEmail) {
        if (userByEmail._id.toString() !== req.user._id) {
          return res.status(400).json({
            errors: [{ msg: "User already exists. Use another email" }],
          });
        }
      }
    }

    let newUser = await User.findOneAndUpdate(
      { _id: req.body.id },
      { $set: req.body },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json({ msg: "Update Successfuly" });
  }
  return res.status(400).json({ msg: "No Permission to handle this action" });
});

// route: api/user/delete/:user_id
// description: Delete user
// method: DELETE and it's private (Only Admin)
router.delete(
  "/delete/:user_id",
  auth,
  async (req: AuthRequest, res: Response) => {
    let user = await User.findOne({ _id: req.params.user_id });
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }
    if (req.user.role !== "admin") {
      return res
        .status(400)
        .json({ msg: "You don't have permission to delete user" });
    }
    await User.deleteOne({ _id: req.params.user_id });
    res.json(req.params.user_id);
  }
);
export default router;

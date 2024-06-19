import express, { Router, Request, Response } from "express";
import mongoose from "mongoose";
import Earnings from "../../models/Earnings";
const router: Router = express.Router();

router.post('/add', async (req: Request, res: Response) => {
    const newUser = new Earnings({
        username: req.body.username,
    })
    try {
        let username_check = await Earnings.findOne({ username: req.body.username });
        if (username_check) {
            return res.json(username_check);
        } else {
            await newUser.save();
            res.json(newUser);
        }
    } catch (error) {
        res.status(400).json({ msg: error });
    }
})
router.post("/update/joinTelegram/:username", async (req: Request, res: Response) => {
    const user = await Earnings.findOne({ username: req.params.username });
    if(user) {
        const updated_user = await Earnings.findOneAndUpdate(
            { username: req.params.username },
            { "joinTelegram.status": req.body.status, "joinTelegram.earned": req.body.earned}
        );

        return res.status(200).json({msg: "Update successfully!"});
    } else {
        return res.status(400).json({ msg: "You have no permission" });
    }
})
router.post("/update/subscribeTelegram/:username", async (req: Request, res: Response) => {
    const user = await Earnings.findOne({ username: req.params.username });
    if(user) {
        const updated_user = await Earnings.findOneAndUpdate(
            { username: req.params.username },
            { "subscribeTelegram.status": req.body.status, "subscribeTelegram.earned": req.body.earned}
        );

        return res.status(200).json({msg: "Update successfully!"});
    } else {
        return res.status(400).json({ msg: "You have no permission" });
    }
})
router.post("/update/followTwitter/:username", async (req: Request, res: Response) => {
    const user = await Earnings.findOne({ username: req.params.username });
    if(user) {
        const updated_user = await Earnings.findOneAndUpdate(
            { username: req.params.username },
            { "followTwitter.status": req.body.status, "followTwitter.earned": req.body.earned}
        );

        return res.status(200).json({msg: "Update successfully!"});
    } else {
        return res.status(400).json({ msg: "You have no permission" });
    }
})
router.post("/:username", async (req: Request, res: Response) => {
    let user = await Earnings.findOne({ username: req.params.username });
    if (user) {
      res.json(user);
    } else {
      return res.status(400).json({ msg: "You not found" });
    }
  });
export default router;






















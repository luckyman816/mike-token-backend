import express, { Router, Request, Response } from "express";
import mongoose from "mongoose";
import Vibe from "../../models/Vibe";

const router: Router = express.Router();

router.post("/add", async (req: Request, res: Response) => {
  const vibe_new = new Vibe({
    username: req.body.username,
  });
  try {
    let vibe_check = await Vibe.findOne({ username: req.body.username });
    if (vibe_check) {
      return res.json(vibe_check);
    } else {
      await vibe_new.save();
      res.json(vibe_new);
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
router.post("/updateVibe/:username", async (req: Request, res: Response) => {
  const vibe = await Vibe.findOne({ username: req.params.username });
  if (vibe) {
    const updated_vibe = await Vibe.findOneAndUpdate(
      { username: req.params.username },
      { vibe_date: req.body.vibe_date }
    );
    const return_vibe = {
      _id: updated_vibe._id,
      username: updated_vibe.username,
      message: updated_vibe.message,
      vibe_date: req.body.vibe_date
    };
    return res.status(200).json(return_vibe);
  } else {
    return res.status(400).json({ msg: "You have no vibe" });
  }
});
router.post("/updateMessage/:username", async (req: Request, res: Response) => {
  const vibe = await Vibe.findOne({ username: req.params.username });
  if (vibe) {
    const updated_vibe = await Vibe.findOneAndUpdate(
        {username: req.params.username},
        {message: req.body.message}
    );
    const return_vibe = {
        _id: updated_vibe._id,
        username: updated_vibe.username,
        message: req.body.message,
        vibe_date: updated_vibe.vibe_date
    };
    return res.status(200).json(return_vibe);
  } else {
    return res.status(400).json({ msg: "You have no vibe" });
  }
})
router.post("/:username", async (req: Request, res: Response) => {
    let vibe = await Vibe.find({ username: req.params.username });
    if (vibe) {
        res.json(vibe);
    } else {
        return res.status(400).json({ msg: "No vibe" });
    }
})
export default router;

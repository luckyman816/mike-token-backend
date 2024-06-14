import express, { Router, Request, Response } from "express";
import mongoose from "mongoose";
import Wallet from "../../models/Wallet";

const router: Router = express.Router();

router.post("/add", async (req: Request, res: Response) => {
  console.log("----------->wallet---->", req.body);
  const user_new = new Wallet({
    user_id: req.body.user_id,
    username: req.body.username
  });
  try {
    const { user_id } = req.body;
    let user_check = await Wallet.findOne({ user_id });
    if (user_check) {
      return res.json(user_check);
    } else {
      await user_new.save();
      res.json(user_new);
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
router.post("/update/:user_id", async (req: Request, res: Response) => {
  const wallet = await Wallet.findOne({user_id: req.params.user_id});
  console.log("requeset", req.body);
  if (wallet) {
    const updated_wallet = await Wallet.findOneAndUpdate(
      {user_id: req.params.user_id},
      { balance: req.body.balance, energy: req.body.energy },
    );
    //   console.log("--------------test----------",updated_wallet);
    const return_wallet = {
      _id: updated_wallet._id,
      user_id: updated_wallet.user_id,
      username: updated_wallet.username,
      balance: req.body.balance,
      energy: req.body.energy
    };
    return res.status(200).json(return_wallet);
  } else {
    return res.status(400).json({ msg: "You have no permission" });
  }
});
router.post("/updateEnergy/:user_id", async (req: Request, res: Response) => {
  const wallet = await Wallet.findOne({user_id: req.params.user_id});
  console.log("requeset", req.body);
  if (wallet) {
    const updated_wallet = await Wallet.findOneAndUpdate(
      {user_id: req.params.user_id},
      { energy: req.body.energy },
    );
    //   console.log("--------------test----------",updated_wallet);
    const return_wallet = {
      _id: updated_wallet._id,
      user_id: updated_wallet.user_id,
      username: updated_wallet.username,
      balance: updated_wallet.balance,
      energy: req.body.energy
    };
    return res.status(200).json(return_wallet);
  } else {
    return res.status(400).json({ msg: "You have no permission" });
  }
});
router.post("/updateBalance/:user_id", async (req: Request, res: Response) => {
  const wallet = await Wallet.findOne({user_id: req.params.user_id});
  console.log("requeset", req.body);
  if (wallet) {
    const updated_wallet = await Wallet.findOneAndUpdate(
      {user_id: req.params.user_id},
      { balance: req.body.balance },
    );
    //   console.log("--------------test----------",updated_wallet);
    const return_wallet = {
      _id: updated_wallet._id,
      user_id: updated_wallet.user_id,
      username: updated_wallet.username,
      balance: req.body.balance,
      energy: updated_wallet.energy
    };
    return res.status(200).json(return_wallet);
  } else {
    return res.status(400).json({ msg: "You have no permission" });
  }
});
router.get("/all", async (req: Request, res: Response) => {
  const users = await Wallet.find();
  res.json(users);
});
router.delete("/delete/:user_id", async (req: Request, res: Response) => {
  let wallet = await Wallet.findOne({ _id: req.params.user_id });
  if (!wallet) {
    return res.status(404).json({ msg: "User not found." });
  }
  await Wallet.deleteOne({ _id: req.params.user_id });
  res.json({ msg: "Delete Successfully" });
});
export default router;

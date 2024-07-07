import express, { Router, Request, Response } from "express";
import mongoose from "mongoose";
import Wallet from "../../models/Wallet";

const router: Router = express.Router();

router.post("/add", async (req: Request, res: Response) => {
  console.log("----------->wallet---->", req.body);
  const user_new = new Wallet({
    username: req.body.username,
  });
  try {
    const { username } = req.body;
    let user_check = await Wallet.findOne({ username });
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
router.post("/update/:username", async (req: Request, res: Response) => {
  const wallet = await Wallet.findOne({ username: req.params.username });
  console.log("requeset", req.body);
  if (wallet) {
    const updated_wallet = await Wallet.findOneAndUpdate(
      { username: req.params.username },
      { balance: req.body.balance, energy: req.body.energy }
    );
    //   console.log("--------------test----------",updated_wallet);
    const return_wallet = {
      _id: updated_wallet._id,
      username: updated_wallet.username,
      balance: req.body.balance,
      energy: req.body.energy,
      full_energy: updated_wallet.full_energy,
      tap: updated_wallet.tap,
      limit: updated_wallet.limit,
      daily_coins: updated_wallet.daily_coins
    };
    return res.status(200).json(return_wallet);
  } else {
    return res.status(400).json({ msg: "You have no permission" });
  }
});
router.post("/updateEnergy/:username", async (req: Request, res: Response) => {
  const wallet = await Wallet.findOne({ username: req.params.username });
  console.log("requeset", req.body);
  if (wallet) {
    const updated_wallet = await Wallet.findOneAndUpdate(
      { username: req.params.username },
      { energy: req.body.energy }
    );
    //   console.log("--------------test----------",updated_wallet);
    const return_wallet = {
      _id: updated_wallet._id,
      username: updated_wallet.username,
      balance: updated_wallet.balance,
      energy: req.body.energy,
      full_energy: updated_wallet.full_energy,
      tap: updated_wallet.tap,
      limit: updated_wallet.limit,
      daily_coins: updated_wallet.daily_coins
    };
    return res.status(200).json(return_wallet);
  } else {
    return res.status(400).json({ msg: "You have no permission" });
  }
});
router.post("/updateTap/:username", async (req: Request, res: Response) => {
  const wallet = await Wallet.findOne({ username: req.params.username });
  console.log("requeset", req.body);
  if (wallet) {
    const updated_wallet = await Wallet.findOneAndUpdate(
      { username: req.params.username },
      { tap: req.body.tap }
    );
    //   console.log("--------------test----------",updated_wallet);
    const return_wallet = {
      _id: updated_wallet._id,
      username: updated_wallet.username,
      balance: updated_wallet.balance,
      energy: updated_wallet.energy,
      full_energy: updated_wallet.full_energy,
      tap: req.body.tap,
      limit: updated_wallet.limit,
      daily_coins: updated_wallet.daily_coins
    };
    return res.status(200).json(return_wallet);
  } else {
    return res.status(400).json({ msg: "You have no permission" });
  }
});
router.post("/updateLimit/:username", async (req: Request, res: Response) => {
  const wallet = await Wallet.findOne({ username: req.params.username });
  console.log("requeset", req.body);
  if (wallet) {
    const updated_wallet = await Wallet.findOneAndUpdate(
      { username: req.params.username },
      { limit: req.body.limit }
    );
    //   console.log("--------------test----------",updated_wallet);
    const return_wallet = {
      _id: updated_wallet._id,
      username: updated_wallet.username,
      balance: updated_wallet.balance,
      energy: updated_wallet.energy,
      full_energy: updated_wallet.full_energy,
      tap: updated_wallet.tap,
      limit: req.body.limit,
      daily_coins: updated_wallet.daily_coins
    };
    return res.status(200).json(return_wallet);
  } else {
    return res.status(400).json({ msg: "You have no permission" });
  }
});
router.post("/updateBalance/:username", async (req: Request, res: Response) => {
  const wallet = await Wallet.findOne({ username: req.params.username });
  console.log("requeset", req.body);
  if (wallet) {
    const updated_wallet = await Wallet.findOneAndUpdate(
      { username: req.params.username },
      { balance: req.body.balance }
    );
    //   console.log("--------------test----------",updated_wallet);
    const return_wallet = {
      _id: updated_wallet._id,
      username: updated_wallet.username,
      balance: req.body.balance,
      energy: updated_wallet.energy,
      full_energy: updated_wallet.full_energy,
      tap: updated_wallet.tap,
      limit: updated_wallet.limit,
      daily_coins: updated_wallet.daily_coins
    };
    return res.status(200).json(return_wallet);
  } else {
    return res.status(400).json({ msg: "You have no permission" });
  }
});
router.post("/updateDailyCoins/:username", async (req: Request, res: Response) => {
  const wallet = await Wallet.findOne({ username: req.params.username });
  console.log("requeset", req.body);
  if (wallet) {
    const updated_wallet = await Wallet.findOneAndUpdate(
      { username: req.params.username },
      { daily_coins: req.body.daily_coins }
    );
    //   console.log("--------------test----------",updated_wallet);
    const return_wallet = {
      _id: updated_wallet._id,
      username: updated_wallet.username,
      balance: req.body.balance,
      energy: updated_wallet.energy,
      full_energy: updated_wallet.full_energy,
      tap: updated_wallet.tap,
      limit: updated_wallet.limit,
      daily_coins: updated_wallet.daily_coins
    };
    return res.status(200).json(return_wallet);
  } else {
    return res.status(400).json({ msg: "You have no permission" });
  }
});
router.post("/updateFullEnergy/:username", async (req: Request, res: Response) => {
  const wallet = await Wallet.findOne({ username: req.params.username });
  console.log("requeset", req.body);
  if (wallet) {
    const updated_wallet = await Wallet.findOneAndUpdate(
      { username: req.params.username },
      { full_energy: req.body.full_energy }
    );
    //   console.log("--------------test----------",updated_wallet);
    const return_wallet = {
      _id: updated_wallet._id,
      username: updated_wallet.username,
      balance: updated_wallet.balance,
      energy: updated_wallet.energy,
      full_energy: req.body.full_energy,
      tap: updated_wallet.tap,
      limit: updated_wallet.limit,
      daily_coins: updated_wallet.daily_coins
    };
    return res.status(200).json(return_wallet);
  } else {
    return res.status(400).json({ msg: "You have no permission" });
  }
});
router.get("/all", async (req: Request, res: Response) => {
  const users = await Wallet.find().limit(5).sort({'balance': -1});
  res.json(users);
});
router.post("/:username", async (req: Request, res: Response) => {
  let user = await Wallet.findOne({ username: req.params.username });
  if (user) {
    res.json(user);
  } else {
    return res.status(400).json({ msg: "You not found" });
  }
});
router.delete("/delete/:username", async (req: Request, res: Response) => {
  let wallet = await Wallet.findOne({ _id: req.params.username });
  if (!wallet) {
    return res.status(404).json({ msg: "User not found." });
  }
  await Wallet.deleteOne({ _id: req.params.username });
  res.json({ msg: "Delete Successfully" });
});
export default router;

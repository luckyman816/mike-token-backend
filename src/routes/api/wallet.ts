import express, { Router, Request, Response } from "express";
import mongoose from "mongoose";
import Wallet from "../../models/Wallet";

const router: Router = express.Router();

router.post("/add", async (req: Request, res: Response) => {
  console.log("----------->wallet---->", req.body);
  const wallet_new = new Wallet({
    wallet_address: req.body.wallet_address,
  });
  try {
    const { wallet_address } = req.body;
    let wallet_check = await Wallet.findOne({ wallet_address });
    if (wallet_check) {
      return res.json(wallet_check);
    } else {
      await wallet_new.save();
      res.json(wallet_new);
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
router.post("/update/:wallet_address", async (req: Request, res: Response) => {
  const wallet = await Wallet.findOne({wallet_address: req.params.wallet_address});
  console.log("requeset", req.body);
  if (wallet) {
    const updated_wallet = await Wallet.findOneAndUpdate(
      {wallet_address: req.params.wallet_address},
      { balance: req.body.balance, energy: req.body.energy },
    );
    //   console.log("--------------test----------",updated_wallet);
    const return_wallet = {
      _id: req.params.orderId,
      wallet_address: updated_wallet.wallet_address,
      balance: req.body.balance,
      energy: req.body.energy
    };
    return res.status(200).json(return_wallet);
  } else {
    return res.status(400).json({ msg: "You have no permission" });
  }
});
router.get("/all", async (req: Request, res: Response) => {
  const factories = await Wallet.find();
  res.json(factories);
});
router.delete("/delete/:wallet_id", async (req: Request, res: Response) => {
  let wallet = await Wallet.findOne({ _id: req.params.wallet_id });
  if (!wallet) {
    return res.status(404).json({ msg: "User not found." });
  }
  await Wallet.deleteOne({ _id: req.params.wallet_id });
  res.json({ msg: "Delete Successfully" });
});
export default router;

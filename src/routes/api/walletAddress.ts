import express, { Router, Request, Response } from "express";
import WalletAddress from "../../models/WalletAddress";

const router: Router = express.Router();

router.post("/add", async (req: Request, res: Response) => {
  const walletAddress_new = new WalletAddress({
    username: req.body.username,
    address: req.body.address,
    chain: req.body.chain
  });
  try {
    let walletAddress_check = await WalletAddress.findOne({ address: req.body.address });
    if (walletAddress_check) {
      return res.status(400).json({ msg: "Address is already inserted" });
    } else {
      await walletAddress_new.save();
      res.json(walletAddress_new);
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
export default router;
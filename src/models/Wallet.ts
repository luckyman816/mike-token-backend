import { Schema, model } from "mongoose";

const WalletSchema: Schema = new Schema({
  wallet_address: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0
  },
  energy: {
    type: Number,
    default: 1000
  }
});
const Wallet = model("Wallet", WalletSchema);

export default Wallet;
import { Schema, model } from "mongoose";
import moment from "moment";

const WalletSchema: Schema = new Schema({
  username: {
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
  },
  full_energy: {
    type: Number,
    default: 1
  },
  tap: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 1000
  },
  daily_coins: {
    type: Date,
    default: moment()
  },
});
const Wallet = model("Wallet", WalletSchema);

export default Wallet;
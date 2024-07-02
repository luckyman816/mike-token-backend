import { Schema, model } from "mongoose";
const WalletAddressSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  chain: {
    type: String,
    required: true
  }
});
const WalletAddress = model("WalletAddress", WalletAddressSchema);

export default WalletAddress;

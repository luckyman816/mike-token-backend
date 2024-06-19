import { Schema, model } from "mongoose";

const EarningsSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  joinTelegram: {
    status: {
      type: Boolean,
      default: false,
    },
    earned: {
      type: Boolean,
      default: false,
    },
  },
  subscribeTelegram: {
    status: {
      type: Boolean,
      default: false,
    },
    earned: {
      type: Boolean,
      default: false,
    },
  },
  followTwitter: {
    status: {
      type: Boolean,
      default: false,
    },
    earned: {
      type: Boolean,
      default: false,
    },
  },
});
const Earnings = model("Earnings", EarningsSchema);

export default Earnings;

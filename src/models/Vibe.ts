import { Schema, model } from "mongoose";
import moment from "moment";
const VibeSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: Boolean,
    default: true
  },
  vibe_date: {
    type: String,
    default: () => moment().subtract(1, 'days').toISOString(),
  }
});
const Vibe = model("Vibe", VibeSchema);

export default Vibe;

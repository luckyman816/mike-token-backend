import { Schema, model } from "mongoose";
import moment from "moment";
const VibeSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  vibe_date: {
    type: String,
    default: () => moment().subtract(1, 'days').toDate(),
  }
});
const Vibe = model("Vibe", VibeSchema);

export default Vibe;

import {Schema,model} from "mongoose"
const FriendSchema: Schema = new Schema({
    username: {
      type: String,
      required: true,
    },
    friend: {
      type: String,
      required: true
    }
  });
  const Friend = model("Friend", FriendSchema);
  
  export default Friend;
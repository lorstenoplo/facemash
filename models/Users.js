const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: false,
    default: "",
  },
  occupation: {
    type: String,
    required: false,
    default: "",
  },
  surveryresponse: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  // Add other relevant user fields (e.g., email, address, etc.) as needed
});
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

const userpostschema = mongoose.Schema({
  title: String,
  description: String,
  userid: String,
  username: String,
  likes: {
    type: [String], // Store user IDs who liked the post
    default: [],    // Initialize as an empty array
  },
   likesCount: {
    type: Number,
    default: 0,     // Initialize the like count to 0
  },
}, {
  versionKey: false,
  timestamps: true
});

const userpostmodel = mongoose.model("userpost", userpostschema);

module.exports = {
  userpostmodel
};

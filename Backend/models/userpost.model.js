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
}, {
  versionKey: false,
  timestamps: true
});

const userpostmodel = mongoose.model("userpost", userpostschema);

module.exports = {
  userpostmodel
};

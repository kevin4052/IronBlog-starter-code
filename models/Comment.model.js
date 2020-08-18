const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    message: {type: String},
    user: { type: Schema.Types.ObjectId, ref: "User" },
    post: { type: Schema.Types.ObjectId, ref: "Comment" }
  },
  {
    timestamps: true
  }
);

module.exports = model('Comment', commentSchema);
const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    title: { type: String },
    message: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    comments: {
      type: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Post', postSchema);
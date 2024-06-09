const mongoose = require("mongoose")
const { Schema } = mongoose

const articleSchema = new Schema({
  title: String,
  subtitle: String,
  body: String,
  img: {
    type: String,
  },
  publishedDate: { type: Date, default: Date.now },
  status: {
    type: String,
    required: true,
    enum: ["Draft", "Published"],
    default: "Draft",
  },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  topic: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
})

module.exports = mongoose.model("Article", articleSchema)

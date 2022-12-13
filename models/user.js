const mongoose = require("mongoose")
const { Schema } = mongoose
const bcrypt = require("bcrypt")

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  },
  password: {
    type: String,
    required: true,
    match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
    minlength: 8,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  about: {
    type: String,
    maxlength: 160,
  },
  avatar: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  topics: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
})

userSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.password
  return obj
}

userSchema.pre("save", async function (next) {
  const user = this
  const hash = await bcrypt.hash(user.password, 10)
  user.password = hash
  next()
})

userSchema.methods.isValidPassword = async function (passwordAttempt) {
  const user = this
  const compare = await bcrypt.compare(passwordAttempt, user.password)
  return compare
}

module.exports = mongoose.model("User", userSchema)

const mongoose = require("mongoose")
const { Schema } = mongoose

var topicSchema = new Schema({
  name: { type: String, required: true, min: 3, max: 100 },
})
module.exports = mongoose.model("Topic", topicSchema)

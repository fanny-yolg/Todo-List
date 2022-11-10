const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
}, { timestamps : true })

module.exports = mongoose.model("Todo", todoSchema);
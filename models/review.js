const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = mongoose.Schema({
  rate: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  bookId: {
    type: ObjectId,
    ref: "Book",
  },
});

module.exports = mongoose.model("Review", reviewSchema);

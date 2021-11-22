const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  image: {
    type: String,
    required: [true, "Book photo is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  reviews: [
    {
      type: ObjectId,
      ref: "Review",
    },
  ],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  postedBy: { type: ObjectId, ref: "User" },
});

module.exports = mongoose.model("Book", bookSchema);

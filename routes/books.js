const express = require("express");
const router = express.Router();
const controller = require("../controllers/books");

router
  .post("/createbook", controller.uploadBookImage)
  .get("/allbooks", controller.fetchAllBooks)
  .get("/allbooks/:id", controller.fetchOneBook)
  // .get("/books/popular", controller.fetchByRating)

  // .post("/books/search", controller.findBookByTitle)
  // .get("/books/rating/:rate", controller.getBooksByRating)

  .post("/books/filter", controller.filterBooks)
  .get("/books/classic", controller.fetchClassicBooks)
  .get("/books/history", controller.fetchHistoryBooks)
  .get("/books/action", controller.fetchActionBooks)
  .get("/mybooks", controller.fetchMyBooks)
  .put("/createreview", controller.updateBookReview)
  .post("/books/:id/reviews", controller.createBookReview)
  .get("/books/:id/reviews", controller.getReviews)
  .delete("/deletebook/:bookId", controller.deleteBook);

module.exports = router;

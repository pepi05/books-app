const Book = require("../models/book");
const Review = require("../models/review");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
var _ = require("lodash");

module.exports = {
  createBook: async (req, res) => {
    try {
      const book = await Book.create({
        ...req.body,

        postedBy: req.user,
      });
      res.status(200).json({
        book,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  fetchAllBooks: async (req, res) => {
    try {
      const books = await Book.find().populate("reviews");
      res.status(200).json({
        books,
      });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  fetchOneBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: new Error("Product not found") });
        t;
      }
    } catch (error) {}
  },
  fetchActionBooks: async (req, res) => {
    try {
      const books = await Book.find({
        category: "action",
      });
      res.json({
        books,
      });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  fetchClassicBooks: async (req, res) => {
    try {
      const books = await Book.find({
        category: "classic",
      });
      res.json({
        books,
      });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  fetchHistoryBooks: async (req, res) => {
    try {
      const books = await Book.find({
        category: "history",
      });
      res.json({
        books,
      });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  fetchMyBooks: async (req, res) => {
    try {
      const books = await Book.find({ postedBy: req.user._id });

      res.status(200).json({
        books,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // fetchByRating: async (req, res) => {
  //   try {
  //     const books = await Book.find();
  //     const sorted = books.sort((a, b) => {
  //       return b.rating - a.rating;
  //     });
  //     res.send(sorted);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },

  filterBooks: async (req, res) => {
    let query = {};
    let rate = {};
    try {
      if (!req.body.rate) {
        query = { $regex: req.body.query, $options: "i" };
        const books = await Book.find({ title: query });
        res.json({ books });
      }
      if (!req.body.query) {
        rate = req.body.rate;
        const ratePlusOne = +rate + 1;
        const books = await Book.find({
          rating: { $gte: rate, $lt: ratePlusOne },
        });
        res.json({ books });
      }
      if (req.body.rate && req.body.query) {
        rate = req.body.rate;
        const ratePlusOne = +rate + 1;
        query = { $regex: req.body.query, $options: "i" };

        const books = await Book.find({
          title: query,
          rating: { $gte: rate, $lt: ratePlusOne },
        });
        res.json({ books });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // getBooksByRating: async (req, res) => {
  //   const rate = req.params.rate;
  //   const ratePlusOne = +rate + 1;

  //   try {
  //     if (rate) {
  //       const books = await Book.find({
  //         rating: { $gte: rate, $lt: ratePlusOne },
  //       });
  //       res.json({ books });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },

  // findBookByTitle: async (req, res) => {
  //   let query = {};
  //   try {
  //     if (req.body.query) {
  //       query = { $regex: req.body.query, $options: "i" };
  //       const books = await Book.find({ title: query });
  //       res.json({ books });
  //     } else {
  //       const books = await Book.find();
  //       res.json({ books });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },

  createBookReview: async (req, res) => {
    try {
      const { reviewId, rating } = req.body;
      const book = await Book.findById(req.params.id).populate({
        path: "reviews",
      });

      if (book) {
        if (book.reviews.length == 0) {
          const prosek = book.reviews.reduce(
            (a, c) => c.rate + a,
            rating / (book.reviews.length + 1)
          );
          book.rating = prosek;
          // console.log("prosek 1", prosek);
        }

        const bookReviews = book.reviews.map((b) => b.postedBy).toString();

        // if (!bookReviews.includes(req.user._id)) {
        await book.updateOne(
          {
            $push: { reviews: reviewId },
          },
          {
            new: true,
          }
        );
        book.numReviews = book.reviews.length + 1;
        let total = rating;
        if (book.reviews.length > 0) {
          book.reviews.forEach((review) => (total += review.rate));
          const totalRating = total / (book.reviews.length + 1);

          book.rating = totalRating.toPrecision(3);
          // const prosek = book.reviews.reduce((a, c) => a + c.rate, rating);
          // console.log("PROSEK", prosek);
          // const total = prosek / book.reviews.length + 1;
        }

        const updatedBook = await book.save();
        res.status(201).send({
          data: updatedBook.reviews,
          message: "Review saved successfully.",
        });
        // }
      }
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  updateBookReview: async (req, res) => {
    const { rate, comment, postedBy, bookId } = req.body;

    try {
      const book = await Book.findById(bookId).populate("reviews");

      book.numReviews = book.reviews.length;

      // await book.save();

      //   book.reviews.reduce((acc, item) => (acc + item.rate) / book.numReviews)
      //   .toPrecision(3);

      const bookReviews = book.reviews
        .map((review) => review.postedBy)
        .toString();

      if (!rate) {
        res.status(400).json({ error: new Error("Please rate the book") });
      }
      if (bookReviews.includes(req.user._id)) {
        const newBook = await Review.findOneAndUpdate(
          { bookId: bookId, postedBy: req.user._id },
          {
            rate: rate,
            comment: comment,
          },
          {
            new: true,
          }
        );
        if (newBook) {
          const book = await Book.findById(bookId).populate("reviews");
          let total = 0;
          book.reviews.forEach((review) => (total += review.rate));

          let totalRating = total / book.reviews.length;
          book.rating = totalRating;

          await book.save();
        }
      } else {
        const review = await Review.create({
          rate,
          comment,
          postedBy,
          bookId,
        });

        res.status(200).json({ review });
        await book.save();
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  getReviews: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).populate({
        path: "reviews",
        populate: {
          path: "postedBy",
        },
      });

      res.status(200).json({ book });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteBook: async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.bookId);
      res.json({ message: `Book with id ${req.params.bookId} is deleted` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  uploadBookImage: (req, res) => {
    const form = new formidable.IncomingForm();
    // console.log("FORM", form);

    // const uploadFolder = path.join(__dirname, "public", "files");
    // form.maxFileSize = 50 * 1024 * 1024; // 5MB
    // form.uploadDir = uploadFolder;
    // console.log("FORMMM", form);
    form.parse(req, async (err, fields, files) => {
      // const allowedTypes = [
      //   "image/jpeg",
      //   "image/jpg",
      //   "image/gif",
      //   "image/png",
      // ];

      // if (!allowedTypes.includes(files.image.mimetype)) {
      //   return res
      //     .status(400)
      //     .json({ error: new Error("File type is not allowed") });
      // }

      if (files) {
        var dir = `public/files/foldertest/`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        fs.writeFile(
          `public/files/foldertest/${files.image.newFilename}.jpg`,
          fs.readFileSync(files.image.filepath),
          function (err) {
            if (err) {
              console.log(err);
            }
          }
        );
      }
      // const filePath = files.image.filepath;

      try {
        const book = await Book.create({
          ...fields,
          postedBy: req.user,
          image: `${files.image.newFilename}.jpg`,
        });
        res.status(200).json({
          book,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

      if (err) {
        console.log("Error parsing the files");
        return res.status(400).json({
          status: "Fail",
          message: "There was an error parsing the files",
          error: err,
        });
      }
    });

    // try {
    //   const allowedTypes = [
    //     "image/jpeg",
    //     "image/jpg",
    //     "image/gif",
    //     "image/png",
    //   ];
    //   const maxFileSize = 5 * 1024 * 1024;

    //   const file = req.files.image;
    //   // const file = form;

    //   if (!allowedTypes.includes(file.mimetype)) {
    //     return res
    //       .status(400)
    //       .json({ error: new Error("File type is not allowed") });
    //   }

    //   if (file.size > maxFileSize) {
    //     return res
    //       .status(400)
    //       .json({ error: new Error("File size exceeds the allowed limit") });
    //   }

    //   const uploadDirectory = path.join(
    //     __dirname,
    //     "..",
    //     "uploads",
    //     req.user._id
    //   );
    //   const uploadsRootDirectory = path.join(__dirname, "..", "uploads");

    //   if (!fs.existsSync(uploadsRootDirectory)) {
    //     fs.mkdirSync(uploadsRootDirectory);
    //   }

    //   if (!fs.existsSync(uploadDirectory)) {
    //     fs.mkdirSync(uploadDirectory);
    //   }

    //   const fileName = `${file.name}`;
    //   file.mv(`${uploadDirectory}/${fileName}`);
    //   res.status(200).json({
    //     message: `File with name ${fileName} is uploaded successfully`,
    //     file,
    //   });
    // } catch (error) {
    //   res.status(500).json({ error: error.message });
    // }
  },
};

const mongoose = require("mongoose");
// const validator = require('validator');

const articleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 5
    },
    body: {
      type: String,
      trim: true,
      required: true,
      minlength: 120
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const Article = new mongoose.model("Article", articleSchema);

// const task = new Task({
// 	description: 'Learn Node and Mongo   '
// });

// task
// 	.save()
// 	.then(() => {
// 		console.log(task);
// 	})
// 	.catch(error => {
// 		console.log('Error: ', error);
// 	});

module.exports = Article;

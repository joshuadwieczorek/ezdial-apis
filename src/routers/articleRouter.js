const express = require("express");
const router = express.Router();
const Article = require("../models/article");
const auth = require("../middleware/auth");

// Route for making new articles
router.post("/articles", auth, async (req, res) => {
  const article = new Article({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await article.save();
    res.status(201).send(article);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Route for listing all articles
// GET /articles?limit=10&skip=10
// GET /articles?completed=true or false
// GET /articles?sortBy=createdAt:desc
router.get("/articles", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    //const articles = await article.find({owner: req.user._id});
    await req.user
      .populate({
        path: "articles",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.articles);
  } catch (e) {
    res.status(500).send();
  }
});

// Route for fetching individual articles by ID

router.get("/articles/:id", auth, async (req, res) => {
  // console.log(req.params.id);
  const _id = req.params.id;

  try {
    const article = await Article.findOne({ _id, owner: req.user._id });

    if (!article) {
      return res.status(404).send();
    }
    res.send(article);
  } catch (e) {
    res.status(500).send();
  }
});

// Route for updating a article
router.patch("/articles/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const article = await Article.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!article) {
      return res.status(404).send();
    }
    updates.forEach((update) => (article[update] = req.body[update]));
    await article.save();

    res.send(article);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Delete a article
router.delete("/articles/:id", auth, async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!article) {
      return res.status(404).send();
    }
    res.send(article);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

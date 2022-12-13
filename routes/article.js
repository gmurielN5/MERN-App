const express = require("express")
const ContentRouter = express.Router()
const requireJwtAuth = require("../Middleware/RequireJWAuth")
const parser = require("../Middleware/Cloudinary")

const articleCtrl = require("../controllers/articleController")
const topicCtrl = require("../controllers/topicController")
const userCtrl = require("../controllers/userController")

//ARTICLES ROUTES

//Create
ContentRouter.route("/:userId").post(
  requireJwtAuth,
  parser.single("img"),
  articleCtrl.create
)

//todo
// Pivate homepage : list NewsFeed for user
ContentRouter.route("/").get(articleCtrl.listNewsFeed)

ContentRouter.route("/following/:userId").get(
  requireJwtAuth,
  articleCtrl.listFollowing
)

//Get/Update/Delete article by id
ContentRouter.route("/:articleId")
  .get(articleCtrl.read_article)
  .put(requireJwtAuth, parser.single("img"), articleCtrl.update_article)
  .delete(requireJwtAuth, articleCtrl.delete_article)

//Articles likes
ContentRouter.route("/article/like").put(requireJwtAuth, articleCtrl.like)

ContentRouter.route("/article/unlike").put(requireJwtAuth, articleCtrl.unlike)

//TOPICS ROUTES

//POST request for creating Topic.
ContentRouter.post("/topic/create", topicCtrl.topic_create)
// GET request for one Topic.
ContentRouter.get("/topic/:id", topicCtrl.topic_detail)

// GET request for list of all Topic.
ContentRouter.get("/topic", topicCtrl.topic_list)

ContentRouter.param("articleId", articleCtrl.articleByID)
ContentRouter.param("userId", userCtrl.userByID)

module.exports = ContentRouter

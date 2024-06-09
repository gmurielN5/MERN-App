const Article = require("../models/article")
const User = require("../models/user")
const Topic = require("../models/topic")

exports.articleByID = async (req, res, next, id) => {
  try {
    const article = await Article.findById(id)
    if (!article)
      return res
        .status(404)
        .json({ message: { msgBody: "Article not found", msgError: true } })

    req.article = article
    next()
  } catch (error) {
    return next(error)
  }
}

exports.create = async (req, res, next) => {
  const newArticle = new Article(req.body)
  let imgPath = null
  if (req.file) {
    imgPath = req.file.path
  }
  newArticle.img = imgPath
  newArticle.author = req.profile

  try {
    await User.findByIdAndUpdate(req.profile._id, {
      $push: { articles: newArticle },
    })
    const article = await newArticle.save()
    return res.status(201).json({
      article,
      message: { msgBody: "article succesfully created", msgError: false },
    })
  } catch (error) {
    return next(error)
  }
}

exports.listNewsFeed = async (req, res, next) => {
  try {
    // retrieve most popular and addField
    const articles = await Article.aggregate([
      { $match: { status: "Published" } },
      { $sort: { publishedDate: -1 } },
      { $limit: 6 },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
    ])
    //aggregate thought User to get only user who published and sort most liked limit to 8
    const users = await User.find()

    //aggregate thought Topic to get only topics with most articles
    const topics = await Topic.find()

    return res.status(200).json({
      articles,
      topics,
      users,
      message: { msgBody: "articles succesfully fetched", msgError: false },
    })
  } catch (error) {
    return next(error)
  }
}

exports.listFollowing = async (req, res, next) => {
  try {
    const articles = await Article.find({
      author: { $in: req.profile.following },
    })
      .sort({ publishedDate: -1 })
      .exec()

    return res.status(200).json({
      articles,
      message: {
        msgBody: "articles by user you follow succesfully fetched",
        msgError: false,
      },
    })
  } catch (error) {
    return next(error)
  }
}

exports.listByUser = async (req, res, next) => {
  try {
    const articles = await Article.find({ author: req.profile._id })
      .sort({
        publishedDate: -1,
      })
      .exec()

    return res.status(201).json({
      articles,
      message: { msgBody: "articles succesfully fetched", msgError: false },
    })
  } catch (error) {
    return next(error)
  }
}

exports.read_article = async (req, res, next) => {
  const article = req.article
  try {
    const user = await User.findById(article.author).populate("articles").exec()

    return res.status(201).json({
      user,
      article,
      message: { msgBody: "article succesfully fetched", msgError: false },
    })
  } catch (error) {
    return next(error)
  }
}

exports.update_article = async (req, res, next) => {
  const id = req.article._id
  try {
    let imgPath = null
    if (req.file) {
      imgPath = req.file.path
    }

    const updatedArticle = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      body: req.body.body,
      status: req.body.status,
      img: imgPath,
    }
    Object.keys(updatedArticle).forEach(
      (k) =>
        !updatedArticle[k] &&
        updatedArticle[k] !== undefined &&
        delete updatedArticle[k]
    )

    const article = await Article.findByIdAndUpdate(
      id,
      { $set: updatedArticle },
      { new: true },
      (err, article) => {
        if (err) {
          res.status(500).json({
            message: {
              msgBody: "Something went wrong. Profile not updated",
              msgError: true,
            },
          })
          return next(err)
        }
        return res.status(201).json({
          article,
          message: { msgBody: "article succesfully updated", msgError: false },
        })
      }
    )
  } catch (error) {
    return next(error)
  }
}

exports.delete_article = async (req, res, next) => {
  const user = req.user.id
  const id = req.article.id

  try {
    if (user !== req.user.id)
      return res.status(400).json({
        message: { msgBody: "Authorization denied", msgError: true },
      })

    const updatedUser = await User.findByIdAndUpdate(
      user,
      { $pull: { articles: id } },
      { new: true }
    )
    const deletedArticle = await Article.findByIdAndDelete(id)

    return res.status(200).json({
      article: deletedArticle,
      message: {
        msgBody: "article deleted successfully",
        msgError: false,
      },
    })
  } catch (error) {
    return next(error)
  }
}

exports.like = async (req, res, next) => {
  try {
    let article = await Article.findByIdAndUpdate(
      req.body.articleId,
      { $push: { likes: req.body.userId } },
      { new: true }
    )
      .populate("author")
      .exec()
    return res.status(201).json({
      userId: req.body.userId,
      article,
      message: { msgBody: "article liked", msgError: false },
    })
  } catch (error) {
    return next(error)
  }
}

exports.unlike = async (req, res, next) => {
  try {
    let article = await Article.findByIdAndUpdate(
      req.body.articleId,
      { $pull: { likes: req.body.userId } },
      { new: true }
    )
      .populate("author")
      .exec()
    return res.status(201).json({
      userId: req.body.userId,
      article,
      message: { msgBody: "article unliked", msgError: false },
    })
  } catch (error) {
    return next(error)
  }
}

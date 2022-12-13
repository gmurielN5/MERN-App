const User = require("../models/user")
const Article = require("../models/article")

//Profile User //
/**
 * Load user and append to req.
 */
exports.userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).populate("articles").exec()
    if (!user) {
      res
        .status(404)
        .json({ message: { msgBody: "User not found", msgError: true } })
    }
    req.profile = user
    next()
  } catch (error) {
    return next(error)
  }
}

/**
 * Get user profile.
 */
exports.read = async (req, res) => {
  return res.status(201).json(req.profile)
}

/**
 * Update user profile.
 */

exports.update = async (req, res, next) => {
  try {
    let ReqUser = req.profile
    if (ReqUser.id !== req.user.id)
      return res.status(400).json({
        message: { msgBody: "Authorization denied", msgError: true },
      })

    let avatarPath = null
    if (req.file) {
      avatarPath = req.file.path
    }

    const existingUser = await User.findOne({ username: req.body.username })
    if (existingUser && existingUser.id !== ReqUser.id) {
      return res.status(400).json({
        message: { msgBody: "Username already exist", msgError: true },
      })
    }

    if (req.body.username === "") {
      return res.status(400).json({
        message: { msgBody: "Username is required", msgError: true },
      })
    }

    const updatedUser = {
      avatar: avatarPath,
      username: req.body.username,
      about: req.body.about,
    }
    Object.keys(updatedUser).forEach(
      (k) =>
        !updatedUser[k] && updatedUser[k] !== undefined && delete updatedUser[k]
    )
    const user = await User.findByIdAndUpdate(
      ReqUser.id,
      { $set: updatedUser },
      { new: true }
    )

    res.status(200).json({
      user,
      message: {
        msgBody: "user profile edited successfully",
        msgError: false,
      },
    })
  } catch (error) {
    return next(error)
  }
}

/**
 * Delete user profile.
 */
exports.remove = async (req, res, next) => {
  try {
    let ReqUser = req.profile
    if (ReqUser.id !== req.user.id)
      return res.status(400).json({
        message: { msgBody: "Authorization denied", msgError: true },
      })

    await Promise.all([
      Article.deleteMany({ author: req.user.id }),
      User.findOneAndRemove({ _id: ReqUser.id }),
    ])
    return res.status(200).json({
      user: "",
      message: {
        msgBody: "user profile deleted successfully",
        msgError: false,
      },
    })
  } catch (error) {
    return next(error)
  }
}

/**
 * Add Following to user profile.
 */
exports.addFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { following: req.body.followId },
    })

    next()
  } catch (error) {
    return next(error)
  }
}

/**
 * Add Follower to user profile.
 */
exports.addFollower = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body.followId,
      { $push: { followers: req.body.userId } },
      { new: true }
    )
      .populate("articles")
      .exec()

    return res.status(201).json({
      userId: req.body.userId,
      followId: req.body.followId,
      user,
      message: {
        msgBody: `${req.body.userId} start following ${req.body.followId} `,
        msgError: false,
      },
    })
  } catch (error) {
    return next(error)
  }
}

/**
 * Remove Following to user profile.
 */
exports.removeFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $pull: { following: req.body.unfollowId },
    })
    next()
  } catch (error) {
    return next(error)
  }
}
/**
 * Remove Follower to user profile.
 */
exports.removeFollower = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body.unfollowId,
      { $pull: { followers: req.body.userId } },
      { new: true }
    )
      .populate("articles")
      .exec()

    return res.status(201).json({
      userId: req.body.userId,
      unfollowId: req.body.unfollowId,
      user,
      message: {
        msgBody: `${req.body.userId} unfollowed ${req.body.unfollowId} `,
        msgError: false,
      },
    })
  } catch (error) {
    return next(error)
  }
}

//add topic of interest
//remove topic of interest

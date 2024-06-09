const express = require("express")
const UserRoute = express.Router()
const requireJwtAuth = require("../Middleware/RequireJWAuth")

const parser = require("../Middleware/Cloudinary")

const userCtrl = require("../controllers/userController")

// add user/profile route here isAuthenticated
// Profile User //
UserRoute.route("/:userId")
  .get(userCtrl.read)
  .put(requireJwtAuth, parser.single("avatar"), userCtrl.update)
  .delete(requireJwtAuth, userCtrl.remove)

UserRoute.route("/user/follow").put(
  requireJwtAuth,
  userCtrl.addFollowing,
  userCtrl.addFollower
)

UserRoute.route("/user/unfollow").put(
  requireJwtAuth,
  userCtrl.removeFollowing,
  userCtrl.removeFollower
)

UserRoute.param("userId", userCtrl.userByID)

module.exports = UserRoute

const { body, validationResult } = require("express-validator")
const userValidation = () => {
  return [
    // email validation
    body("email")
      .isEmail()
      .notEmpty()
      .withMessage("Not all fields have been entered.")
      .bail(),
    // password validation
    body("password")
      .notEmpty()
      .withMessage("Not all fields have been entered.")
      .isLength({ min: 8 })
      .withMessage("password must be at least 12 chars long")
      .matches(/\d/)
      .withMessage("password must contain a number"),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  let extractedErrors = []
  errors.array().map((err) => (extractedErrors = err.msg))
  return res.status(422).json({
    message: { msgBody: extractedErrors, msgError: true },
  })
}
module.exports = {
  userValidation,
  validate,
}

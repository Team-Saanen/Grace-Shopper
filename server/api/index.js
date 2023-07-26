const router = require("express").Router();
module.exports = router;

router.use("/", require("./admin"));
router.use("/cart", require("./cart"));
router.use("/", require("./users"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

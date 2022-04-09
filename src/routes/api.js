const router = require("express").Router();

router.get("/hello", (req, res) => {
  console.log(`req is ${req.body}`);
  res.send({ test: "it worked" });
});

module.exports = router;

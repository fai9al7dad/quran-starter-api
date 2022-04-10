"use strict";
var router = require("express").Router();
router.get("/hello", function (req, res) {
    console.log("req is ".concat(req.body));
    res.send({ test: "it worked" });
});
module.exports = router;
//# sourceMappingURL=api.js.map
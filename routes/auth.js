var express = require("express");
var router = express.Router();

var _ = require("lodash");

const tempUser = {
  user: "davey",
  pass: "absolutelyCorrect",
  badLoginCount: 0
};

router.post("/", function(req, res) {
  const { user, pass } = req.body;
  if (_.isEmpty(user) || _.isEmpty(pass)) {
    res.status(400).send({ error: `User and Password are required.` });
  }

  if (user === tempUser.user && tempUser.badLoginCount > 2) {
    setTimeout(() => {
      tempUser.badLoginCount = 0;
    }, 5000);
    res
      .status(400)
      .send({ error: `User is locked out from too many bad login attempts.` });
  }

  if (user !== tempUser.user || pass !== tempUser.pass) {
    tempUser.badLoginCount += 1;
    res.status(401).send({ error: `User and Password are incorrect.` });
  }

  res.send({ message: `Cheers! enjoy your root access.` });
});

module.exports = router;

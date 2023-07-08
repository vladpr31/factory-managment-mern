const express = require("express");
const auth = require("../BLLs/userAuthService");
const router = express.Router();

router.route("/login").post(async (req, res) => {
  try {
    const result = await auth.authenticateUser(req.body);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json(err.message);
  }
});

router.route("/refreshsession").post((req, res) => {
  const { access_token, refresh_token } = req.body;
  const result = auth.refreshToken({ access_token, refresh_token });
  if (result !== "Need To Login Again") {
    res.status(200).json(result);
  } else {
    res.status(401).json(result);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const shiftService = require("../BLLs/shiftService");

router.route("/newShift").post(async (req, res) => {
  try {
    const { newShift: shiftData } = req.body;
    const response = await shiftService.createNewShift(shiftData);
    res.status(200).json(response);
  } catch (err) {
    res.status(401).json(err.message);
  }
});

router.route("/removeShift/:id").delete(async (req, res) => {
  const response = await shiftService.deleteShift(req.params.id);
  res.status(200).json(response);
});

router.route("/updateShift/:id").post(async (req, res) => {
  try {
  } catch (err) {
    res.status(401).json(err.message);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const response = await shiftService.getShift(id);
    res.status(200).json(response);
  } catch (err) {
    res.status(401).json(err.message);
  }
});
module.exports = router;

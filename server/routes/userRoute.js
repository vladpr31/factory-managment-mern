const express = require("express");
const router = express.Router();
const userService = require("../BLLs/userService");
const employeeDB = require("../DALs/employeeDBService");

router.route("/all").get(async (req, res) => {
  const response = await userService.getAllEmployees();
  res.status(200).json(response);
});
router.route("/:id").get(async (req, res) => {
  try {
    const { id: userID } = req.params;
    const response = await userService.getUserByID(userID);
    if (response) {
      res.json(response);
    } else {
      throw Error("No ID");
    }
  } catch (err) {
    res.status(401).json(err.message);
  }
});

router.route("/:id/newShift").post(async (req, res) => {
  try {
    const { newShift: shiftData } = req.body;
    const response = await userService.createNewShift(shiftData);
    res.status(200).json(response);
  } catch (err) {
    res.status(401).json(err.message);
  }
});

router.route("/:id/update").patch(async (req, res) => {
  try {
    const { id, updatedInfo } = req.body;
    const { firstName, lastName } = updatedInfo;
    const updateResponse = await userService.updateUser({
      id,
      firstName,
      lastName,
    });

    res.status(200).json(updateResponse);
  } catch (err) {
    res.status(401).json(err.message);
  }
});
router.route("/removeShift/:id").delete(async (req, res) => {
  const response = await userService.deleteShift(req.params.id);
  res.status(200).json(response);
});
module.exports = router;

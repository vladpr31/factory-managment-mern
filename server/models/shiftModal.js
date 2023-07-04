const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
  id: String,
  date: Date,
  startingHour: Date,
  endingHour: Date,
  shiftWorkers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
});

const Shift = mongoose.model("Shift", shiftSchema);
module.exports = Shift;

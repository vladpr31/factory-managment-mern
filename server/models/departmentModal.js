const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  id: String,
  name: String,
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;

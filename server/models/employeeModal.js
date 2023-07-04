const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  firstName: String,
  lastName: String,
  startWorkYear: Number,
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shift" }],
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;

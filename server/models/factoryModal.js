const mongoose = require("mongoose");

const factorySchema = new mongoose.Schema(
  {
    name: String,
    employees: { type: mongoose.Schema.Types.ObjectId, ref: "Employees" },
  },
  { versionKey: false }
);

const Factory = mongoose.model("Factory", factorySchema);

module.exports = Factory;

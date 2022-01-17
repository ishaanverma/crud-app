const mongoose = require("mongoose");

const InventorySchema = mongoose.Schema({
  itemId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  count: {
    type: Number,
    required: true,
  },
  addedOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedOn: {
    type: Date,
  },
});

module.exports = mongoose.model("InventoryModel", InventorySchema);

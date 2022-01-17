const express = require("express");
const { v4: uuidv4 } = require("uuid");
const InventoryModel = require("../models/InventoryModel");
const downloadResource = require("../utils/downloadResource");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Inventory Endpoint" });
});

router.post("/create", async (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .send({ status: 400, message: "Request missing property: name" });
  }
  if (!req.body.count) {
    return res
      .status(400)
      .send({ status: 400, message: "Request missing property: count" });
  }

  let item = new InventoryModel({
    itemId: uuidv4(),
    name: req.body.name,
    type: req.body.type || "",
    count: req.body.count,
  });

  try {
    item = await item.save();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ status: 500, message: "Error creating item" });
  }

  return res
    .status(200)
    .send({ status: 200, message: "success", itemId: item.itemId });
});

router.delete("/delete", async (req, res) => {
  const { itemId } = req.body;

  if (!itemId) {
    return res
      .status(400)
      .send({ status: 400, message: "Request missing property: itemId" });
  }

  try {
    await InventoryModel.updateOne(
      { itemId: itemId },
      {
        deleted: true,
        deletedOn: Date.now(),
      }
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ status: 500, message: "Error deleting item" });
  }

  return res
    .status(200)
    .send({ status: 200, message: "success", itemId: itemId });
});

router.patch("/update", async (req, res) => {
  const { itemId, name, count, type } = req.body;
  const updatedItem = {};

  if (!itemId) {
    return res
      .status(400)
      .send({ status: 400, message: "Request missing property: itemId" });
  }

  if (name) {
    updatedItem.name = name;
  }
  if (count) {
    updatedItem.count = count;
  }
  if (type) {
    updatedItem.type = type;
  }

  try {
    await InventoryModel.updateOne(
      { itemId: itemId },
      {
        ...updatedItem,
        updatedOn: Date.now(),
      }
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ status: 500, message: "Error deleting item" });
  }

  return res
    .status(200)
    .send({ status: 200, message: "success", itemId: itemId });
});

router.get("/all", async (req, res) => {
  let all;
  try {
    all = await InventoryModel.find({ deleted: false }).limit(20);
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: "Error fetching items" });
  }
  return res.status(200).send({ status: 200, message: "sucesss", data: all });
});

router.get("/download", async (req, res) => {
  const fields = ["itemId", "name", "type", "count"];
  let all;
  try {
    all = await InventoryModel.find({ deleted: false }).limit(20);
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: "Error fetching items" });
  }

  return downloadResource(res, 'items.csv', fields, all);
});

module.exports = router;

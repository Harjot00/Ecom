const express = require("express");
const router = express.Router();
const orders = require("../Models/orders");

const customers = require("../Models/customers");

router.post("/placeOrder", async (req, res) => {
  let newOrder;
  let customer;
  let order;
  try {
    customer = await customers.findOne({ _id: req.body.customerId });

    if (!customer) {
      return res.status(404).json("customer not found");
    } else {
      newOrder = orders({
        orderDetail: { ...req.body.orderDetail },
        products: req.body.products,
        customer: customer._id,
      });
      newOrder.save().then(() => {
        customer.orders.push(newOrder._id);
        return res.status(200).json("order placed in the database");
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.delete("/cancelOrder/:id", async (req, res) => {
  let order;

  try {
    order = await orders.findOne({ _id: req.params.id });
    if (!order) {
      return res.status(404).json("order not found");
    } else {
      order.delete();
      return res.status(200).json("order deleted");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/orderDetail/:id", async (req, res) => {
  let order;
  try {
    order = await orders.findOne({ _id: req.params.id });

    if (!order) {
      return res.status(404).json("order not found");
    } else {
      order.delete();
      return res.status(200).json(order);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;

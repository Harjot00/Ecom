const express = require("express");
const router = express.Router();
const orders = require("../Models/orders");
const { createTokens, validateToken } = require("../Middleware/auth");

const customers = require("../Models/customers");

router.post("/placeorder", validateToken, async (req, res) => {
  let newOrder;
  let customer;
  try {
    customer = await customers.findById(req.cookies["customer_id"]);

    if (!customer) {
      return res.status(404).json("customer not found");
    } else {
      newOrder = orders({
        orderDetail: { ...req.body.orderDetail },
        products: req.body.products,
        customer: req.cookies["customer_id"],
      });
      newOrder.save().then(() => {
        customer.orders.push(newOrder._id);

        customer.save();
        return res.status(200).json("order placed in the database");
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.delete("/cancelOrder/:id", validateToken, async (req, res) => {
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

router.get("/orderDetail/:id", validateToken, async (req, res) => {
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

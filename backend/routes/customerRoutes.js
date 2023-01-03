const express = require("express");
const customers = require("../Models/customers");
const bcrypt = require("bcrypt");
const router = express.Router();
const { createToken, validateToken } = require("../Middleware/auth");

router.post("/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    country,
    streetAddress,
    city,
    state,
    postalCode,
  } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newCustomer = customers({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    country: country,
    streetAddress: streetAddress,
    city: city,
    state: state,
    postalCode: postalCode,
  });

  let existingCustomer;

  try {
    existingCustomer = await customers.findOne({ email: req.body.email });
  } catch (err) {
    console.log(err);
  }

  if (existingCustomer) {
    res.status(400).json("customer already exists with this email");
  } else {
    await newCustomer
      .save()
      .then(() => {
        const accessToken = createToken(newCustomer);

        res.cookie("access_token", accessToken, {
          sameSite: "none",
          domain: process.env.DOMAIN,
          httpOnly: false,
          secure: true,
        });
        res.cookie("customer_id", newCustomer._id, {
          httpOnly: false,
          sameSite: "none",
          domain: process.env.DOMAIN,
          secure: true,
        });
        res.status(200).json({ loggedIn: true });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

router.post("/login", async (req, res) => {
  let customer, isPasswordCorrect;

  try {
    customer = await customers.findOne({ email: req.body.email });
    if (!customer) {
      return res.status(404).json("incorrect email");
    } else {
      isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        customer.password
      );
      if (!isPasswordCorrect) {
        return res.status(404).json("Password is incorrect");
      }

      const accessToken = createToken(customer);
      res.cookie("access_token", accessToken, {
        httpOnly: false,
        sameSite: "none",
        domain: process.env.DOMAIN,
        secure: true,
      });
      res.cookie("customer_id", customer._id, {
        httpOnly: false,
        sameSite: "none",
        domain: process.env.DOMAIN,
        secure: true,
      });

      return res.status(200).json({ loggedIn: true });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/allorders", validateToken, async (req, res) => {
  let allOrders;

  try {
    allOrders = await customers
      .findOne({ _id: req.cookies["customer_id"] })
      .populate({
        path: "orders",
        populate: {
          path: "products",
        },
      });

    const customerOrders = [];

    for (const order of allOrders.orders) {
      customerOrders.push({
        id: order._id,
        details: order.orderDetail,
        products: order.products,
      });
    }

    if (!customerOrders) {
      return res.status(404).json("no customer found");
    } else {
      return res.status(200).json(customerOrders);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;

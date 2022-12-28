const express = require("express");
const customers = require("../Models/customers");
const bcrypt = require("bcrypt");
const router = express.Router();

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
        res.status(200).json({ id: newCustomer._id, loggedIn: true });
      })
      .catch((err) => {
        res.status(500).json({ err });
        console.log(err);
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

      return res.status(200).json({ loggedIn: true, id: customer._id });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/allOrders/:id", async (req, res) => {
  let allOrders;

  try {
    allOrders = await customers
      .findOne({ _id: req.params.id })
      .populate("orders");

    if (!allOrders) {
      return res.status(404).json("no customer found");
    } else {
      return res.status(200).json(allOrders);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;

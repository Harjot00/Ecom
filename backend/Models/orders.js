const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerDetailSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  streetAddress: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
});

const orderDetailsSchema = new Schema({
  subTotal: {
    type: Number,
    required: true,
  },
  shipping: {
    type: Number,
    required: true,
  },
  orderTotal: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema({
  customer: [
    {
      type: Schema.Types.ObjectId,
      ref: "Customers",
      required: true,
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
  orderDetail: {
    type: orderDetailsSchema,
    required: true,
  },
  customerDetail: {
    type: customerDetailSchema,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
  ],
});

const orders = mongoose.model("Orders", orderSchema);

module.exports = orders;

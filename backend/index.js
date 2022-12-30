const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const customerRouter = require("./routes/customerRoutes");
const orderRouter = require("./routes/orderRoutes");
const productRouter = require("./routes/productRoutes");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("successfully connected to DB");
  })
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: ["http://localhost:3001", "http://192.168.2.21:3001"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", orderRouter);
app.use("/api", customerRouter);
app.use("/api", productRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("server started on port ", process.env.PORT || 3000);
});

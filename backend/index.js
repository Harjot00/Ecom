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
    origin: ["http://localhost:3001"],
    credentials: true,
  })
);

app.get("*", function (_, res) {
  res.sendFile(path.join("/frontend/build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", orderRouter);
app.use("/api", customerRouter);
app.use("/api", productRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("server started on port ", process.env.PORT || 3000);
});

module.exports = app;

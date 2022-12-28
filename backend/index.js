const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
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

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join("frontend", "build")));
}

app.use("/api", orderRouter);
app.use("/api", customerRouter);
app.use("/api", productRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.resolve("frontend", "build", "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server started on port ", process.env.PORT || 3000);
});

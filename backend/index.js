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
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("successfully connected to DB");
  })
  .catch((err) => console.log(err));

app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.DOMAIN || "http://localhost:3000/",
    "Cache-Control",
    "no-store"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", orderRouter);
app.use("/api", customerRouter);
app.use("/api", productRouter);

if (process.env.NODE_ENV == "production") {
  app.use(
    express.static(
      path.join(__dirname, "../frontend/build", {
        etag: false,
      }),
      { maxAge: "1d" }
    )
  );
  app.get("*", function (_, res) {
    res.sendFile(
      path.join(__dirname, "../frontend/build/index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}

app.listen(process.env.PORT || 3000, () => {
  console.log("server started on port ", process.env.PORT || 3000);
});

module.exports = app;

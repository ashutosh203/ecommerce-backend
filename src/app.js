//external modules
const express = require("express");
const cors = require("cors");

// local modules
const sellerRoutes = require("./routes/sellerRoutes.routes");
const adminRoutes = require("./routes/admin.routes");
const userRoute = require("./routes/user.routes");
const { errorHandler } = require("./utils/errorHandler");

// create express app
const app = express();

// CORS (frontend ko allow karne ke liye)
app.use(cors());
/* ---------- MIDDLEWARES ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use("/api/seller", sellerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoute);
app.use(errorHandler);
module.exports = app;

/* ---------- ROUTES ---------- */
// Add your routes here
/*
app.js
routes/
middlewares/
controllers/
models/
*/

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const app = express();
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");

dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the homepage");
});
// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // Set the status to the error status or default to 500
  res.status(err.status || 500);
  res.send(`Error ${err.status}: ${err.message}`);
});

app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server started on port ${PORT}`));

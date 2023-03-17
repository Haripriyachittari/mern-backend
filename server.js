const path = require("path");
const cors = require('cors');

const express = require("express");
const goalRouter = require("./routes/goalRoutes");
const userRouter = require("./routes/userRoutes");
require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/db");
connectDB();

const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors({
    origin: ['*']
}));

app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);

// // Serve frontend
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "../", "frontend", "build", "index.html")
//     )
//   );
// } else {
//   app.get("/", (req, res) => res.send("Please set to production"));
// }

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Lets build mern stack application");
});
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

import express from "express";
import users from "./routes/UserRoute.js";
import bunkers from "./routes/BunkerRoute.js";
import connectDB from "./db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

//connect to database
connectDB();
//parse json
app.use(express.json());
//
const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Define Routes
app.use("/users", users);
app.use("/bunkers", bunkers);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

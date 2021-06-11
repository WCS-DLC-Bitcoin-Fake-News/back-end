import express from "express";
import users from "./routes/users.js";
import connectDB from "./db.js";
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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

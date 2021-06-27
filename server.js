import express from "express";
import ApiRoutes from "./routes/ApiRoutes.js"
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
app.use("/api", ApiRoutes);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

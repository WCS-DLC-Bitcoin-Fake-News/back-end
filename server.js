import express from "express";
import ApiRoutes from "./routes/ApiRoutes.js"
import connectDB from "./db.js";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors())
app.use('/public', express.static('public'));

app.set('view engine', 'ejs');
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


app.use("/", (req, res, next) => {
  res.render('tweetDisplay.html');
});



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/database");
const cookieparser = require("cookie-parser");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);
const PORT = process.env.PORT || 5000;

dbConnect();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/user", require("./routes/user"));

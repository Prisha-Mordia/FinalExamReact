const express = require("express");
const cors = require("cors");
const { connectDb } = require("./config/db");

connectDb();
const PORT = 8000;
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', require("./routes/userRoute"));

app.listen(PORT, (error) => {
    if (error) {
        console.error("Error occured while running server:", error);
        process.exit(1);
    }

    console.log(`Server started on http://localhost:${PORT}`);
})
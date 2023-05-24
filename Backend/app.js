const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { connectDB } = require("./config/db.config");
const userRouter = require("./controllers/user");
const handleError = require('./utils/errorHandler');
const { isLoggedIn } = require("./controllers/middleware");

// Set body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000;

// Connect Database
connectDB();


app.get('/', isLoggedIn, async (req, res) => {
    res.json({ message: 'Hello world!'})
})

app.use("/user", userRouter)


// Error handler
app.use((req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    handleError(error, res);
})

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})
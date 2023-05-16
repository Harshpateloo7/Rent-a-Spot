const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Set body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000;

// app.use('/', (req, res) => {
//     res.json({ message: 'Hello world!'})
// })


// Error handler
const handleError = require('./utils/errorHandler');

app.use("*", (req, res) => {
    console.log(name);
    // const error = new Error('Route not found');
    // error.status = 404;
    handleError(error, res);
})



app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})
const mongoose = require('mongoose')

const paymentMethodSchema = new mongoose.Schema({
    cash: {
        type: Boolean,
        required: true
    },
    interac: {
        type: String,
    }
})

module.exports = mongoose.model("PaymentMethod", paymentMethodSchema)
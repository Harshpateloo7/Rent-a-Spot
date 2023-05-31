const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    space_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model("Booking", bookingSchema)
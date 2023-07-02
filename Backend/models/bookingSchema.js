const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    vehicle_company: {
        type: String,
        required: true
    },
    vehicle_model: {
        type: String,
        required: true
    },
    plate_number: {
        type: String,
        required: true
    },
    car_color: {
        type: String,
        required: true
    },
    confirm_booking: {
        type: String,
        required: true,
        enum: ["approved", "rejected", "pending"],
        default: "pending"
    },
    space_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Space',
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model("Booking", bookingSchema)
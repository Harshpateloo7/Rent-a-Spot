const mongoose = require('mongoose')

const spaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    slot_start_time: {
        type: String,
        required: true
    },
    slot_end_time: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    parking_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Parking'
    }
})

module.exports = mongoose.model("Space", spaceSchema)
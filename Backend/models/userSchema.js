const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["admin", "seeker", "owner"],
        required: true
    },
    cash: {
        type: Boolean,
        required: true,
        default: false
    },
    interac: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model("User", userSchema)
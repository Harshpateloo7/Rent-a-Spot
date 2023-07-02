const { Router } = require("express")
const Booking = require("../models/bookingSchema");
const Joi = require('joi');
const { Types } = require("mongoose");

const bookingRouter = Router();

// Create new booking
bookingRouter.post("/", async (req, res) => {
    try {

        let { vehicle_company, vehicle_model, plate_number, car_color, space_id, user_id, confirm_booking = "pending" } = req.body

        // Input validation
        const schema = Joi.object({
            vehicle_company: Joi.string().required(),
            vehicle_model: Joi.string().required(),
            plate_number: Joi.string().required(),
            car_color: Joi.string().required(),
            space_id: Joi.string().required(),
            user_id: Joi.string().required(),
            confirm_booking: Joi.string().valid("approved", "pending", "rejected"),
        })

        const { error } = schema.validate({ vehicle_company, vehicle_model, plate_number, car_color, space_id, user_id, confirm_booking });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const existsBooking = await Booking.findOne({ user_id, space_id });
        if (existsBooking) {
            return res.status(400).json({ error: 'Space is already booked' });
        }
        else {
            const booking = await Booking.create({ vehicle_company, vehicle_model, plate_number, car_color, space_id, user_id, confirm_booking });
            res.json({ message: "Booking created", booking });
        }
    } catch (error) {
        console.error(" error - ", error);
        res.status(400).json({ error });
    }
});

// Get existing booking list
bookingRouter.get("/", async (req, res) => {
    try {
        const { user_id, owner_id } = req.query;
        if (user_id) {
            const booking = await Booking.find({ user_id }).populate({ path: 'space_id', populate: { path: 'parking_id' } });

            return res.json(booking);
        }
        let booking = await Booking.find({}).populate({ path: 'space_id', populate: { path: 'parking_id' } });
        if (owner_id) {
            booking = booking.filter((item) => item?.space_id?.parking_id?.user_id.equals(owner_id))
        }

        res.json(booking);
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Update booking
bookingRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { confirm_booking } = req.body;

        if (Types.ObjectId.isValid(id)) {
            const booking = await Booking.findById({ _id: id })
            if (!booking) {
                res.status(400).json({ error: "Provide correct booking id" })
            }
            else {
                // Input validation
                const schema = Joi.object({
                    space_id: Joi.string().required(),
                    user_id: Joi.string().required(),
                    confirm_booking: Joi.string().valid("approved", "pending", "rejected"),
                })

                let { space_id, user_id } = booking;
                space_id = space_id.toString()
                user_id = user_id.toString()
                const updatedBookingObj = { space_id, user_id, ...req.body, confirm_booking }

                const { error } = schema.validate(updatedBookingObj);
                if (error) {
                    res.status(400).json({ error: error.details[0].message });
                }
                else {
                    console.log('updatedBookingObj ', updatedBookingObj);
                    if(updatedBookingObj?.confirm_booking === 'approved'){
                        await Booking.updateMany({ space_id }, { $set: { confirm_booking: 'rejected' } });
                    }
                    const updatedBooking = await booking.updateOne(updatedBookingObj)


                    if (updatedBooking) {
                        res.json({ message: 'Booking updated successfully' });
                    }
                    else {
                        res.status(400).json({ error: 'Booking not updated' });
                    }
                }
            }
        }
        else {
            res.status(400).json({ error: "Invalid id" })
        }

    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
});

// Delete booking
bookingRouter.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params

        // Validate id and delete booking if exist
        if (Types.ObjectId.isValid(id)) {
            const booking = await Booking.findByIdAndDelete({ _id: id })

            if (booking) {
                res.json({ message: "Booking deleted successfully" })
            }
            else {
                res.status(404).json({ error: "Booking not found" })
            }
        }
        else {
            res.status(400).json({ error: "Invalid booking id" })
        }
    } catch (error) {
        res.status(400).json({ error })
    }

});


module.exports = bookingRouter
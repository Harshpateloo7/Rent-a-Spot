const { Router } = require("express")
const Space = require("../models/spaceSchema");
const Joi = require('joi');
const { Types } = require("mongoose");
const bookingSchema = require("../models/bookingSchema");

const spaceRouter = Router();

// Create new space
spaceRouter.post("/", async (req, res) => {
    try {
        let { name, date, slot_start_time, slot_end_time, price, parking_id } = req.body

        // Input validation
        const schema = Joi.object({
            name: Joi.string().required(),
            date: Joi.date().required(),
            slot_start_time: Joi.string().required(),
            slot_end_time: Joi.string().required(),
            price: Joi.number().required(),
            parking_id: Joi.string().required(),
        })

        const { error } = schema.validate({ name, date, slot_start_time, slot_end_time, price, parking_id });
        if (error) {
            res.status(400).json({ error: error.details[0].message });
        }
        else {
            const space = await Space.create({ name, date, slot_start_time, slot_end_time, price, parking_id });
            res.json({ message: "Space created", space });
        }
    } catch (error) {
        console.error(" error - ", error);
        res.status(400).json({ error });
    }
});

// Get existing space list
spaceRouter.get("/", async (req, res) => {
    try {
        // const { filters  } = req.params
        // console.log('filters ', filters);
        const { parking_id, date, city, time, availability } = req.query;

        // Build the query object based on provided filters
        const query = {};

        if (parking_id) {
            // Filter by parking_id: Spaces available at specified parking_id
            query.parking_id = { $eq: parking_id };
        }

        if (date) {
            // Filter by date: Spaces available on the specified date
            query.date = { $eq: new Date(date) };
        }

        // // Filter by city
        // if (city) {
        //     query['parking_id.city'] = { $regex: new RegExp(city, 'i') };
        // }

        // Filter by time: Spaces available from start time
        console.log('time ', time);
        if (time) {
            query.slot_start_time = { $eq: time };
        }
        console.log('city ', city);
        console.log('query ', query);
        // Fetch all booked space IDs
        const bookings = await bookingSchema.find().select('space_id').exec();
        const bookedSpaceIds = bookings.map(booking => booking.space_id.toString());

        // Fetch parking spaces
        let spaces;
        if (city) {
            spaces = await Space.find(query)
            .where('parking_id.city').regex(new RegExp(city, 'i'))
            .exec();          
        }
        else {
            spaces = await Space.find(query).populate('parking_id').exec();
        }

        // Filter spaces by availability if the 'availability' filter is provided
        console.log('availability ', availability);
        if (availability) {
            spaces = spaces.filter(space => !bookedSpaceIds.includes(space._id.toString()));
        }

        // Add an 'is_booked' flag to each space
        const spacesWithBookedFlag = spaces.map(space => {
            const isBooked = bookedSpaceIds.includes(space._id.toString());
            return { ...space._doc, is_booked: isBooked };
        });

        // return spaces;
        return res.json(spacesWithBookedFlag);
    } catch (error) {
        console.error('error ', error);
        res.status(400).json({ error });
    }
});

// Reset password
spaceRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (Types.ObjectId.isValid(id)) {
            const space = await Space.findById({ _id: id })
            if (!space) {
                res.status(400).json({ error: "Provide correct space id" })
            }
            else {
                // Input validation
                const schema = Joi.object({
                    name: Joi.string().required(),
                    date: Joi.date().required(),
                    slot_start_time: Joi.string().required(),
                    slot_end_time: Joi.string().required(),
                    price: Joi.number().required(),
                    parking_id: Joi.string().required(),
                })

                let { name, date, slot_start_time, slot_end_time, price, parking_id } = space;
                parking_id = parking_id.toString()
                const updatedSpaceObj = { name, date, slot_start_time, slot_end_time, price, parking_id, ...req.body }

                const { error } = schema.validate(updatedSpaceObj);
                if (error) {
                    res.status(400).json({ error: error.details[0].message });
                }
                else {
                    const updatedSpace = await space.updateOne(updatedSpaceObj)
                    if (updatedSpace) {
                        res.json({ message: 'Space updated successfully' });
                    }
                    else {
                        res.status(400).json({ error: 'Space not updated' });
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

// Delete space
spaceRouter.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params

        // Validate id and delete space if exist
        if (Types.ObjectId.isValid(id)) {
            const space = await Space.findByIdAndDelete({ _id: id })

            if (space) {
                res.json({ message: "Space deleted successfully" })
            }
            else {
                res.status(404).json({ error: "Space not found" })
            }
        }
        else {
            res.status(400).json({ error: "Invalid space id" })
        }
    } catch (error) {
        res.status(400).json({ error })
    }

});


module.exports = spaceRouter
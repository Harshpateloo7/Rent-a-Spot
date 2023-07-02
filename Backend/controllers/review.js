const { Router } = require("express")
const Review = require("../models/reviewSchema");
const Joi = require('joi');
const { Types } = require("mongoose");

const reviewRouter = Router();

// Create new review
reviewRouter.post("/", async (req, res) => {
    try {
        let { message, rating, owner_id, user_id } = req.body

        // Input validation
        const schema = Joi.object({
            message: Joi.string().required(),
            rating: Joi.number().required(),
            owner_id: Joi.string().required(),
            user_id: Joi.string().required(),
        })

        const { error } = schema.validate({ message, rating, owner_id, user_id });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const reviewExists = await Review.findOne({ owner_id, user_id });
        if (reviewExists) {
            res.status(400).json({ error: 'Already reviewed. Cannot review same owner more than once.' })
        }
        else {
            const review = await Review.create({ message, rating, owner_id, user_id });
            res.json({ message: "Review created", review });
        }
    } catch (error) {
        console.error(" error - ", error);
        res.status(400).json({ error });
    }
});

// Get existing review list
reviewRouter.get("/", async (req, res) => {
    try {
        const { owner_id } = req.query;
        if (owner_id) {
            const review = await Review.find({ owner_id }).populate('user_id');

            return res.json(review);
        }
        const review = await Review.find({}).populate('user_id');

        res.json(review);
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Update review
reviewRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (Types.ObjectId.isValid(id)) {
            const review = await Review.findById({ _id: id })
            if (!review) {
                res.status(400).json({ error: "Provide correct review id" })
            }
            else {
                // Input validation
                const schema = Joi.object({
                    space_id: Joi.string().required(),
                    user_id: Joi.string().required(),
                })

                let { space_id, user_id } = review;
                space_id = space_id.toString()
                user_id = user_id.toString()
                const updatedBookingObj = { space_id, user_id, ...req.body }

                const { error } = schema.validate(updatedBookingObj);
                if (error) {
                    res.status(400).json({ error: error.details[0].message });
                }
                else {
                    const updatedBooking = await review.updateOne(updatedBookingObj)
                    if (updatedBooking) {
                        res.json({ message: 'Review updated successfully' });
                    }
                    else {
                        res.status(400).json({ error: 'Review not updated' });
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

// Delete review
reviewRouter.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params

        // Validate id and delete review if exist
        if (Types.ObjectId.isValid(id)) {
            const review = await Review.findByIdAndDelete({ _id: id })

            if (review) {
                res.json({ message: "Review deleted successfully" })
            }
            else {
                res.status(404).json({ error: "Review not found" })
            }
        }
        else {
            res.status(400).json({ error: "Invalid review id" })
        }
    } catch (error) {
        res.status(400).json({ error })
    }

});


module.exports = reviewRouter
const { Router } = require("express")
const Parking = require("../models/parkingSchema");
const Joi = require('joi');
const { Types } = require("mongoose");

const parkingRouter = Router();

// Create new parking
parkingRouter.post("/", async (req, res) => {
    try {
        let { name, address, city, lat, long, user_id } = req.body

        // Input validation
        const schema = Joi.object({
            name: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            lat: Joi.string().required(),
            long: Joi.string().required(),
            user_id: Joi.string().required(),
        })

        const { error } = schema.validate({ name, address, city, lat, long, user_id });
        if (error) {
            res.status(400).json({ error: error.details[0].message });
        }
        else {
            const parking = await Parking.create({ name, address, city, lat, long, user_id });
            res.json({ message: "Parking created", parking });
        }
    } catch (error) {
        console.error(" error - ", error);
        res.status(400).json({ error });
    }
});

// Get existing parking list
parkingRouter.get("/", async (req, res) => {
    try {
        const parking = await Parking.find({}).populate('user_id');

        res.json(parking);
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Reset password
parkingRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (Types.ObjectId.isValid(id)) {
            const parking = await Parking.findById({ _id: id })
            if (!parking) {
                res.status(400).json({ error: "Provide correct parking id" })
            }
            else {
                // Input validation
                const schema = Joi.object({
                    name: Joi.string().required(),
                    address: Joi.string().required(),
                    city: Joi.string().required(),
                    lat: Joi.string().required(),
                    long: Joi.string().required(),
                    user_id: Joi.string().required(),
                })
                
                let { name, address, city, lat, long, user_id } = parking;
                user_id = user_id.toString()
                const updatedParkingObj = { name, address, city, lat, long, user_id, ...req.body }
                
                const { error } = schema.validate(updatedParkingObj);
                if (error) {
                    res.status(400).json({ error: error.details[0].message });
                }
                else {
                    const updatedParking = await parking.updateOne(updatedParkingObj)
                    if(updatedParking){
                        res.json({ message: 'Parking updated successfully' });
                    }
                    else{
                        res.status(400).json({ error: 'Parking not updated' });
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

// Delete parking
parkingRouter.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params

        // Validate id and delete parking if exist
        if (Types.ObjectId.isValid(id)) {
            const parking = await Parking.findByIdAndDelete({ _id: id })

            if (parking) {
                res.json({ message: "Parking deleted successfully" })
            }
            else {
                res.status(404).json({ error: "Parking not found" })
            }
        }
        else {
            res.status(400).json({ error: "Invalid parking id" })
        }
    } catch (error) {
        res.status(400).json({ error })
    }

});


module.exports = parkingRouter
const { Router } = require("express")
const PaymentMethod = require("../models/paymentMethodSchema");
const Joi = require('joi');
const { Types } = require("mongoose");

const paymentMethodRouter = Router();

// Create new paymentMethod
paymentMethodRouter.post("/", async (req, res) => {
    try {
        let { cash, interac } = req.body

        // Input validation
        const schema = Joi.object({
            cash: Joi.boolean().required(),
        })

        const { error } = schema.validate({ cash });
        if (error) {
            res.status(400).json({ error: error.details[0].message });
        }
        else {
            const paymentMethod = await PaymentMethod.create({ cash, interac });
            res.json({ message: "PaymentMethod created", paymentMethod });
        }
    } catch (error) {
        console.error(" error - ", error);
        res.status(400).json({ error });
    }
});

// Get existing paymentMethod list
paymentMethodRouter.get("/", async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.find({});

        res.json(paymentMethod);
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Update payment method
paymentMethodRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (Types.ObjectId.isValid(id)) {
            const paymentMethod = await PaymentMethod.findById({ _id: id })
            if (!paymentMethod) {
                res.status(400).json({ error: "Provide correct paymentMethod id" })
            }
            else {
                // Input validation
                const schema = Joi.object({
                    cash: Joi.boolean().required(),
                })

                let { cash, interac } = paymentMethod;
                let updatedPaymentMethodObj = { cash, ...req.body.cash }

                const { error } = schema.validate(updatedPaymentMethodObj);
                if (error) {
                    res.status(400).json({ error: error.details[0].message });
                }
                else {
                    updatedPaymentMethodObj = { cash, interac, ...req.body }

                    const updatedPaymentMethod = await PaymentMethod.updateOne(updatedPaymentMethodObj)
                    if (updatedPaymentMethod) {
                        res.json({ message: 'PaymentMethod updated successfully' });
                    }
                    else {
                        res.status(400).json({ error: 'PaymentMethod not updated' });
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

// Delete paymentMethod
paymentMethodRouter.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params

        // Validate id and delete paymentMethod if exist
        if (Types.ObjectId.isValid(id)) {
            const paymentMethod = await PaymentMethod.findByIdAndDelete({ _id: id })

            if (paymentMethod) {
                res.json({ message: "PaymentMethod deleted successfully" })
            }
            else {
                res.status(404).json({ error: "PaymentMethod not found" })
            }
        }
        else {
            res.status(400).json({ error: "Invalid paymentMethod id" })
        }
    } catch (error) {
        res.status(400).json({ error })
    }

});


module.exports = paymentMethodRouter
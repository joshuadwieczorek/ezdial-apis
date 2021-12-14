const Addresses = require("../models/address");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { ADDRESS_SCOPES, ADDRESS_TYPES } = require('../constants')
const AddressValidator = require('../middleware/requestValidators/addressValidator');
const mongoose = require("mongoose");

router.get("/addresses/search-global", async (req, res) => {
    try {
        
        const location1 = req.query.location1;
        const location2 = req.query.location2;
        const location3 = req.query.location3;
        const addressScope = req.query.addressScope;

        const address = await Addresses.findOne({
            'symbols.location1' : new mongoose.Types.ObjectId(location1),
            'symbols.location2' : new mongoose.Types.ObjectId(location2),
            'symbols.location3' : new mongoose.Types.ObjectId(location3),
            addressScope: addressScope.toLowerCase(),
        })
        .populate('symbols.location1')
        .populate('symbols.location2')
        .populate('symbols.location3')
        
        if (address === null) {
            res.status(204).send();
            return;   
        }

        res.status(200).send(address);
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "Internal server error!" });
    }
});

router.get("/addresses/search", auth(), async (req, res) => {
    try {
        
        const location1 = req.query.location1;
        const location2 = req.query.location2;
        const location3 = req.query.location3;
        const addressScope = req.query.addressScope;

        const address = await Addresses.findOne({
            'symbols.location1' : new mongoose.Types.ObjectId(location1),
            'symbols.location2' : new mongoose.Types.ObjectId(location2),
            'symbols.location3' : new mongoose.Types.ObjectId(location3),
            addressScope: addressScope,
            owner: req.user._id
        })
        .populate('symbols.location1')
        .populate('symbols.location2')
        .populate('symbols.location3')
        
        if (address === null) {
            res.status(204).send();
            return;   
        }

        res.status(200).send(address);
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "Internal server error!" });
    }
});

router.post("/addresses", auth(), async (req, res) => {
    try {

        const validator = new AddressValidator();
        await validator.validate(req)

        if (validator.errors.length > 0)
            return res.status(validator.errorStatusCode).json(validator.errors)

        const address = new Addresses (validator.data);
        await address.save();

        res.status(201).send(address);
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "Internal server error!" });
    }
});

router.get("/addresses/scopes", auth(), async (req, res) => {
    try {
        let scopes = [];
        Object.keys(ADDRESS_SCOPES).forEach((t) => scopes.push(ADDRESS_SCOPES[t]));
        res.status(200).send(scopes);
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "Internal server error!" });
    }
});

router.get("/addresses/:addressScope", auth(), async (req, res) => {
    try {
        const addresses = await Addresses.find(
            {
                addressScope: req.params.addressScope,
                owner: req.user._id
            });
        res.status(200).send(addresses);
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "Internal server error!" });
    }
});

router.get("/addresses", auth(), async (req, res) => {
    try {
        const addresses = await Addresses
            .find({ owner: req.user._id })
            .populate('symbols.location1')
            .populate('symbols.location2')
            .populate('symbols.location3')
        res.status(200).send(addresses);
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "Internal server error!" });
    }
});

router.delete("/addresses/:id", auth(), async (req, res) => {
    try {
        const result = await Addresses.deleteOne({
            _id: req.params.id,
            owner: req.user._id
        });
        res.status(204).json(result);
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "Internal server error!" });
    }
});

module.exports = router;
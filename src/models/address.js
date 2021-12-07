const mongoose = require("mongoose");
const { ADDRESS_SCOPES, ADDRESS_TYPES } = require("../constants");

const addressSchema = new mongoose.Schema({
        displayName: {
            type: String,
            trim: true,
        },
        symbols: {
            location1: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Symbol"
            },
            location2: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Symbol"
            },
            location3: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Symbol"
            },
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        addressType: {
            type: String,
            enum: [ADDRESS_TYPES.PHONE, ADDRESS_TYPES.WEBSITE]
        },
        addressScope: {
            type: String,
            enum: [ADDRESS_SCOPES.GLOBAL, ADDRESS_SCOPES.USA, ADDRESS_SCOPES.USER]
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    }, {
    timestamps: true
});



module.exports = mongoose.model("Address", addressSchema);

const mongoose = require("mongoose");
const { SYMBOL_TYPES} = require("../constants");

const symbolSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: [SYMBOL_TYPES.EMOJI, SYMBOL_TYPES.ALPHA, SYMBOL_TYPES.NUMERIC]
        },
        symbol: {
            type: String,
            required: true,
            minlength: 1
        },
    },
    {
        timestamps: true
    }
);

const Symbol = new mongoose.model("Symbol", symbolSchema);

module.exports = Symbol;
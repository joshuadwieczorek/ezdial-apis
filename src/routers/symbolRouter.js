const Symbols = require("../models/symbol");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { SYMBOL_TYPES } = require("../constants");

router.post("/symbols", auth(), async (req, res) => {

    try {
        const exists = await Symbols.findOne({ symbol: req.body.symbol, type: req.body.type })

        if (exists)
            return res.status(409).json({ message: "Symbol already exists!" })

        const symbol = new Symbols({
            type: req.body.type,
            symbol: req.body.symbol
        })

        await symbol.save();
        res.status(201).send(symbol);
    }
    catch (e) {
        res.status(500).json({ message: "Internal server error!" });
    }

});


router.post("/symbols/batch", auth(), async (req, res) => {

    try {
        
        let symbols = req.body.symbols.split(',');
        let symbolsThatAlreadyExist = [];
        let createdSymbols = [];
        let errorMessages = [];

        

        for (const s of symbols) {
            let exists = await Symbols.findOne({ symbol: s, type: req.body.type });
            if (exists)
                symbolsThatAlreadyExist.push(s);
        }

        if (symbolsThatAlreadyExist.length > 0)
            return res.status(409).json({ symbols: symbolsThatAlreadyExist, message: 'These symbols already exist' });

        for (const s of symbols) {
            try {
                const symbol = new Symbols({
                    type: req.body.type,
                    symbol: s
                });
                await symbol.save();
                createdSymbols.push(symbol);
            }
            catch (e) {
                console.log(e)
                errorMessages.push(e);
            }
        }

        if (errorMessages.length === symbols.length)
            return res.status(422).json({ message: "No symbols were created", errors: errorMessages });

        return res.status(201).json({
            message: "success",
            data: createdSymbols,
            errors: errorMessages }
        );
    }
    catch (e) {
        res.status(500).json({ message: "Internal server error!" });
    }
});

router.get("/symbols/types", async (req, res) => {
    try {
        let types = [];
        Object.keys(SYMBOL_TYPES).forEach((t) => types.push(SYMBOL_TYPES[t]));
        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
});

router.get("/symbols", async (req, res) => {
    try {
        const symbols = await Symbols.find();
        res.status(200).json(symbols);
    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
});


router.get("/symbols/:type", async (req, res) => {
    try {
        const symbols = await Symbols.find({ type: req.params.type })
        res.status(200).json(symbols);
    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
});


router.delete("/symbols/:id", async (req, res) => {
    try {
        const result = await Symbols.deleteOne({
            _id: req.params.id,
        });
        res.status(204).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
});


module.exports = router;
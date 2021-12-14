const mongoose = require("mongoose");
const { ADDRESS_TYPES, ADDRESS_SCOPES } = require('../../constants')
const Symbols = require('../../models/symbol')
const Addresses = require('../../models/address')

const validator = class AddressValidator
{
    constructor() {
        this.errors = []
        this.errorStatusCode = 400;
        this.data = {}
    }

    async validate(req) {

        const { displayName, symbols, address, addressType, addressScope } = req.body;

        this.data.owner = req.user._id

        // if (displayName === undefined || displayName === '')
        //     this.errors.push({
        //         'field': 'displayName',
        //         'message': 'displayName is required'
        //     })
        // else
        //     this.data.displayName = displayName

        this.data.displayName = '-'

        if (symbols === undefined)
            this.errors.push({
                'field': 'symbols',
                'message': 'symbols are required'
            })

        if (address === undefined || address === '')
            this.errors.push({
                'field': 'address',
                'message': 'address is required'
            })
        else
            this.data.address = address

        if (addressType === undefined || addressType === '')
            this.errors.push({
                'field': 'addressType',
                'message': 'addressType is required'
            })

        if (addressScope === undefined || addressScope === '')
            this.errors.push({
                'field': 'addressScope',
                'message': 'addressScope is required'
            })

        if (addressType)
        {
            const addressTypes = [
                ADDRESS_TYPES.PHONE.toUpperCase(),
                ADDRESS_TYPES.WEBSITE.toUpperCase()
            ]

            if (!addressTypes.includes(addressType.toString().toUpperCase()))
                this.errors.push({
                    'field': 'addressType',
                    'message': 'addressType must be one of ' + addressTypes.join(',')
                })
            else
                this.data.addressType = addressType.toString().toLowerCase()
        }

        if (addressScope)
        {
            const addressScopes = [
                ADDRESS_SCOPES.GLOBAL.toUpperCase(),
                ADDRESS_SCOPES.USA.toUpperCase(),
                ADDRESS_SCOPES.USER.toUpperCase(),
            ]

            if (!addressScopes.includes(addressScope.toString().toUpperCase()))
                this.errors.push({
                    'field': 'addressScope',
                    'message': 'addressScope must be one of ' + addressScopes.join(',')
                })
            else
                this.data.addressScope = addressScope.toString().toLowerCase();
        }

        if (this.errors.length === 0)
        {
            this.data.symbols = {}

            const location1Exists = await Symbols.findOne({_id: symbols.location1})
            if (!location1Exists)
                this.errors.push({
                    'field': 'symbols.location1',
                    'message': 'symbols.location1 invalid symbol id'
                })
            else
                this.data.symbols.location1 = symbols.location1;

            const location2Exists = await Symbols.findOne({_id: symbols.location2})
            if (!location2Exists)
                this.errors.push({
                    'field': 'symbols.location2',
                    'message': 'symbols.location2 invalid symbol id'
                })
            else
                this.data.symbols.location2 = symbols.location2;

            const location3Exists = await Symbols.findOne({_id: symbols.location3})
            if (!location3Exists)
                this.errors.push({
                    'field': 'symbols.location3',
                    'message': 'symbols.location3 invalid symbol id'
                })
            else
                this.data.symbols.location3 = symbols.location3;
        }

        if (this.errors.length === 0)
        {
            if (this.data.addressScope === ADDRESS_SCOPES.USER)
            {
                // const existsByName = await Addresses.findOne({
                //     displayName : this.data.displayName,
                //     addressScope: this.data.addressScope,
                //     owner: req.user._id
                // })

                const existsByName = false;

                if (existsByName)
                {
                    this.errors.push({
                        'field': 'address',
                        'message': 'address already exists for this user by displayName for scope ' + this.data.addressScope
                    })
                    this.errorStatusCode = 409;
                }

                if(existsByName) return;

                const existsBySymbols = await Addresses.findOne({
                    'symbols.location1' : new mongoose.Types.ObjectId(this.data.symbols.location1),
                    'symbols.location2' : new mongoose.Types.ObjectId(this.data.symbols.location2),
                    'symbols.location3' : new mongoose.Types.ObjectId(this.data.symbols.location3),
                    addressScope: this.data.addressScope,
                    owner: req.user._id
                })
                if (existsBySymbols)
                {
                    this.errors.push({
                        'field': 'address',
                        'message': 'address already exists for this user by this symbol set for scope ' + this.data.addressScope
                    })
                    this.errorStatusCode = 409;
                }

            }
            else
            {
                // const existsByName = await Addresses.findOne({
                //     displayName : this.data.displayName,
                //     addressScope: this.data.addressScope,
                // })
                const existsByName = false;
                if (existsByName)
                {
                    this.errors.push({
                        'field': 'address',
                        'message': 'address already exists by displayName for scope ' + this.data.addressScope
                    })
                    this.errorStatusCode = 409;
                }

                if(existsByName) return;

                const existsBySymbols = await Addresses.findOne({
                    'symbols.location1' : new mongoose.Types.ObjectId(this.data.symbols.location1),
                    'symbols.location2' : new mongoose.Types.ObjectId(this.data.symbols.location2),
                    'symbols.location3' : new mongoose.Types.ObjectId(this.data.symbols.location3),
                    addressScope: this.data.addressScope,
                })
                if (existsBySymbols)
                {
                    this.errors.push({
                        'field': 'address',
                        'message': 'address already exists by this symbol set for scope ' + this.data.addressScope
                    })
                    this.errorStatusCode = 409;
                }
            }
        }
    }
}



module.exports = validator;
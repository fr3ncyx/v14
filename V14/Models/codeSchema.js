const { Schema, model } = require("mongoose");

const codeSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    lenght: {
        type: String,
        required: true,
    },
    redeemedBy: {
        id: {
            type: String,
            default: null
        },
        username: {
            type: String,
            default: null,
        },
    },
    reedemedOn: {
        type: Date,
        default: null,
    },
    expiresAt: {
        type: Date,
        index: { expires: 0 },
        default: null
    },
})

const Code = model("Code", codeSchema);

module.exports = { Code };
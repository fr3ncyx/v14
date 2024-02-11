const { model, Schema} = require("mongoose")

let multiVerify = new Schema({
    Guild: String,
    Channel: String,
    roles: Array,
    Member: String
})

module.exports = model("verify", multiVerify)
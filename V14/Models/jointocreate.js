const { model, Schema } = require("mongoose")

const schema = new Schema({
    Guild: String,
    Channel: String,
    UserLimit: Number
})

module.exports = model("join-to-create", schema)
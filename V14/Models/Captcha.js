const {model, Schema } = require("mongoose")

let captchaSchema = new Schema({
    Guild: String,
    Role: String
})

module.exports = model("captcha", captchaSchema)
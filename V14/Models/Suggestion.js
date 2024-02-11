const { model, Schema} = require("mongoose")

let Suggestion = new Schema({
    GuildID: String,
    Message: String,
    Details: Array
});

module.exports = model("Suggestion", Suggestion);
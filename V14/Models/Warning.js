const { model, Schema} = require("mongoose");

let warningSchema = new Schema({
    GuildID: String,
    UserID: String,
    UserTag: String,
    Content: Array,
    Role: String
});

module.exports = new model("WarningSchema", warningSchema);
const {model, Schema} = require("mongoose");

const {recipeSchema} = require("")

const userSchema = new Schema({

    name: String,
    username: {
        type: String,
        unique: true
    },

    password: String,
    role: {
        type: String,
        default: "CHEF",
        enum: ["CHEF", "ADMIN"] //changed Sous Chef to Admin.
    },

    recipe: [{
         type: Schema.Types.ObjectId,
         ref: "Recipe"
    }]
})

const UserModel = model('User', userSchema);

module.exports = {
    UserModel
}
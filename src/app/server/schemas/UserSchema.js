const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    country: {
        type: String,
        required: true,
    }
},
{
    timestamps: true,
}
)

const User = mongoose.model("Users", UserSchema);

module.exports = User; //exporting it
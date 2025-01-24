const mongoose = require("mongoose");

const JeansSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        default: 0,
    },

    price: {
        type: Number,
        required: true,
    },

    sizes: {
        type: Array,
        required: true,
    },

    picture: {
        type: String,
        required: true,
    }
},
{
    timestamps: true,
}
)

const Jeans = mongoose.model("Jeans", JeansSchema);

module.exports = Jeans; //exporting it
const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const employeeSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },
        last_name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            maxlength: 254,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        position: {
            type: String,
            required: true,
            maxlength: 100
        },
        salary: {
            type: Number,
            required: true,
            min: 0
        },
        date_of_joining: {
            type: Date,
            required: true
        },
        department: {
            type: String,
            required: true,
            maxlength: 100
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model('Employee', employeeSchema)
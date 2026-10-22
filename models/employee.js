const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const employeeSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true
        },
        last_name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        position: {
            type: String,
            required: true
        },
        salary: {
            type: Number,
            required: true
        },
        date_of_joining: {
            type: Date,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

module.exports = mongoose.model('Employee', employeeSchema)
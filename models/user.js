// Used this tutorial for hashing: https://www.mongodb.com/company/blog/technical/password-authentication-with-mongoose-part-1

const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require("bcrypt"),
    SALT_WORK_FACTOR = 10;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            maxlength: 254,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        password: {
            type: String,
            required: true,
            select: false,
            maxlength: 100
        },
    },
    { timestamps: true },
);

userSchema.pre("save", async function () {
    // Only hash the password if it's been modified or new
    if (!this.isModified("password")) return;

    // Generate a salt (used to prevent using rainbow tables to obtain the plaintext password from the hashed password)
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    // Hash the password with our salt
    this.password = await bcrypt.hash(this.password, salt);
});

// Used to compare the plaintext password with the hashed password
userSchema.methods.comparePassword = function (candidatePassword, cb)
{
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch)
    {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("User", userSchema)
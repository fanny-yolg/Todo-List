const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
})

//statuc signup method
userSchema.statics.signup = async function(email, password, username, phone_number, name) {
    const existEmail = await this.findOne({email});
    const existUsername = await this.findOne({username});

    if (!username || !password) {
        throw Error("All fields must be filled")
    }
    //Check Email and Username in database 
    if (existEmail || existUsername) {
        throw Error("Email or username already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, username, phone_number, name })
    return user
}

userSchema.statics.login = async function(username, password) {
    if (!username || !password) {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({ username })

    if (!user) {
        throw Error("Incorrect username")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect password")
    }

    return user
}

module.exports = mongoose.model("User", userSchema);

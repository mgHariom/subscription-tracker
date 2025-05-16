import mongoose from "mongoose";

 const userSchema = new mongoose.Schema( {
    name: {
        type: String, 
        required: [true, "UserName is required"],
        trim: true,
        minLength: 2,
        maxLength: 30
    },

    email: {
        type: String, 
        required: [true, "UserName is required"],
        unique: true,
        trim: true,
        minLength: 2,
        maxLength: 255,
        lowercase: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/,
            "Please provide a valid email",
        ],
    },

    password: {
        type: String, 
        required: [true, "Password is required"],
        minLength: 6,
    },

 }, {Timestamps: true} );

 const User = mongoose.model("User", userSchema);

 export default User;
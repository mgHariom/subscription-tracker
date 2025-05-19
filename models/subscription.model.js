import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: 2,
        maxLength: 100
    }, 
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Price must be a greater than 0"],
    },
    currency: {
        type: String,
        required: [true, "Subscription currency is required"],
        enum: ["USD", "EUR", "GBP", "INR"],
        default: "INR",
    },
    frequency: {
        type: String,
        required: [true, "Subscription frequency is required"],
        enum: ["daily", "weekly", "monthly", "yearly"],
        default: "monthly",
    },
    category: {
        type: String,
        required: [true, "Subscription category is required"],
        enum: ["entertainment", "food", "sports", "Technology","others", "study"],
        default: "others",
    },
    paymentMethod: {
        type: String,
        required: [true, "Subscription payment method is required"],
        trim: true,
    },
    status: {
        type: String,
        required: [true, "Subscription status is required"],
        enum: ["active", "inactive", "cancelled", "expired"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: [true, "Subscription start date is required"],
        validate: {
            validator: (value) => value <= new Date(),
            message: "Start date must be in the past or present date",
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function(value) { 
                return value > new this.startDate
            },
            message: "Start date must be in the past",
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
        index: true,
    },
}, {Timestamps: true} );

//auto-calculate the renewal date
subscriptionSchema.pre("save", function(next) {
    if(!this.renewalDate) {
        const renewalperiods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalperiods[this.frequency]);
    }

    //auto-update the status if renewal date is passed
    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }

    next();
})

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
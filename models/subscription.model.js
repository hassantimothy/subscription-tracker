import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [, 'Subscription Name is required'],
        trim: true,
        maxlength: 100,
        minLength: [0, 'Price must be greater than 0']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        trim: true
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP'],
        default: 'USD',

    },
    frequency: {
        type: String,
        enum: ['daily','Weekly','monthly', 'yearly'],
        default: 'monthly'
    },
    category: {
        type: String,
        enum: ['Entertainment', 'Health', 'Fitness', 'Education', 'Finance', 'Lifestyle', 'Technology', 'News', 'Sports', 'Other'],
        default: 'Other',
        required: [true, 'Category is required']
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Paypal', 'Stripe', 'Other'],
        default: 'Credit Card',
        required: [true, 'Payment Method is required']
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'canceled', ],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: [true, 'Start Date is required'],
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start Date cannot be in the future'
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal Date must be after the Start Date'
        }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
        index: true,
    }
    
},
{timestamps: true}
);

// auto-calculate the renewal date 

subscriptionSchema.pre('save', function(next) {
    if(!this.renewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    }

// auto-update the status if renewal data has passed 

    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);    

export default Subscription; 
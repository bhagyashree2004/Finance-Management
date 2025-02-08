import mongoose from 'mongoose';

    const userSchema = new mongoose.Schema(
    {
        fullname: {
        type: String,
        required: true,
        trim: true,
        },
        
        // Define the last name field with type String, required, and trimmed
    
        // Define the email field with type String, required, and trimmed
        email: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Ensure emails are unique
        lowercase: true, // Automatically convert email to lowercase
        },

        // Define the password field with type String, required
        password: {
        type: String,
        required: true,
        trim: true,
        },
        confirmPassword: {
            type: String,
            required: true,
            trim: true,
        },

        // Optionally define the role field to assign a user role (e.g., 'user' or 'admin')
        

        // Define the date the user was created
        createdAt: {
        type: Date,
        default: Date.now, // Default to current date and time
        },

        // Define the date the user was last updated
        updatedAt: {
        type: Date,
        default: Date.now, // Default to current date and time
        },
    },
    {
        timestamps: true, // Automatically create 'createdAt' and 'updatedAt' fields
    }
    );

    // Create and export the model based on the userSchema
    const User = mongoose.model('User', userSchema);

    export default User;
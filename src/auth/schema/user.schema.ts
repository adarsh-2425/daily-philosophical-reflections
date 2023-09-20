import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    philosopherName: String, // philospher based username assigned to user dynamically
    email: String,
    password: String
})
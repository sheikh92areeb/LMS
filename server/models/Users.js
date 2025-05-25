import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['admin', 'student', 'teacher'], default: 'student' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    loginAccess: { type: Boolean, default: true },
    isLoggedIn: { type: Boolean, default: false },
    lastLogin: { type: Date },
    createdAt: { type: Date, default: Date.now }, 
});

const Users = mongoose.models.Users || mongoose.model('Users', usersSchema);
export default Users;
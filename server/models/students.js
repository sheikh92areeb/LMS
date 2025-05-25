import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    fname: {type: String, required: true},
    roll_no: {type: Number, required: true, unique: true},
    courses: {type: String[], default: []},
    slot: {type: String[], default: []},
    cnic: {type: Number , required: true},
    gender : {type: String, enum: ['Male', 'Female', 'Other']},
    dateOfBirth: {type: Date, required: true},
    phone: {type: String, required: true, trim: true},
    address: {type: String, required: true},
    dateOfJoin: {type: Date, default: Date.now},
    isActive: {type: Boolean, default: true},
    profileImg: {type: String}

    email: {type: String, required: true, unique: true, lowercase: true, trim: true},
    password: {type: String, required: true, minlength: 6}
})

const Students = mongoose.model.Students || mongoose.model('Students', studentSchema);
export default Students;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

export const createUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    // 1. Basic field validation
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    try {
        // 2. Check if user already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // 3. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create and save user
        const user = new Users({
            username,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        // 5. Success response (omit password)
        return res.status(201).json({ 
            success: true, 
            message: "User created successfully", 
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            } 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all fields" });
    };

    try {
        // 1. Check if user exists
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Email" });
        };

        // 2. Check account status and login access
        if (user.status === 'inactive' || !user.loginAccess) {
            return res.status(403).json({ success: false, message: "Account is inactive or login access is denied" });
        };

        if (user.isLoggedIn) {
            return res.status(400).json({ success: false, message: "User is already logged in" });
        }

        // 3. Match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Password" });
        };

        // 4. Generate JWT
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        // 5. Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // 6. Update last login and isLoggedIn flag
        user.lastLogin = new Date();
        user.isLoggedIn = true;
        await user.save();

        // 7. Return success with user info
        return res.status(200).json({
            success: true, 
            message: "Login successful",  
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                email: user.email
            }
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const logoutUser = async (req, res) => {

    try {
        const userId = req.user.id;

        if (userId) {
            await Users.updateOne(
                { _id: userId },
                { $set: { isLoggedIn: false } }
            );
        };

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict'
        });

        return res.status(200).json({ success: true, message: "Logout successful" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}
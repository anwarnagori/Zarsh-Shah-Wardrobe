import User from "../../models/userModel.js";
import sendEmail from "../../utils/sendEmail.js";
import emailTemplate from "../../utils/emailTemplate.js";
import makeToken from "../../utils/token.js";

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already in use" });

        // Prevent creating admin via public signup
        const safeRole = role === 'admin' ? 'user' : (role || 'user');
        const user = await User.create({ name, email, password, role: safeRole });
        const token = makeToken(user._id);

        await sendEmail(
            user.email,
            "Welcome to Zarsh Shah Wardrobe 🎉",
            emailTemplate(
                `Welcome, ${user.name} 👋`,
                "Thank you for signing up! We're thrilled to have you join Zarsh Shah Wardrobe. Explore our collection and enjoy shopping with us.",
                "Start Shopping",
                process.env.CLIENT_URL
            )
        );

        res.status(201).json({
            user: { _id: user._id, name: user.name, email: user.email, role: user.role },
            token,
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export default register;

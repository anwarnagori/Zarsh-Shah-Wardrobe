import User from "../../models/userModel.js";
import sendEmail from "../../utils/sendEmail.js";
import emailTemplate from "../../utils/emailTemplate.js";
import makeToken from "../../utils/token.js";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = makeToken(user._id);

        await sendEmail(
            user.email,
            "Login Alert 🔐",
            emailTemplate(
                "Login Successful",
                `Hi ${user.name},<br>You have successfully logged in on <b>${new Date().toLocaleString()}</b>.`,
                "Visit Dashboard",
                process.env.CLIENT_URL + "/dashboard"
            )
        );

        res.json({
            user: { _id: user._id, name: user.name, email: user.email, role: user.role },
            token,
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export default login;

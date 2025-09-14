import crypto from "crypto";
import User from "../../models/User.js";
import sendEmail from "../../utils/sendEmail.js";
import emailTemplate from "../../utils/emailTemplate.js";

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour
        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        console.log("Reset URL:", resetUrl);

        await sendEmail(
            user.email,
            "Password Reset Request 🔑",
            emailTemplate(
                "Reset Your Password",
                `Hi ${user.name},<br>Click the button below to reset your password. This link will expire in 1 hour.`,
                "Reset Password",
                resetUrl
            )
        );

        res.status(200).json({
            message: "Password reset link sent to your email",
        });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default forgotPassword;

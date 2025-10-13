import crypto from "crypto";
import User from "../../models/userModel.js";
import sendEmail from "../../utils/sendEmail.js";
import emailTemplate from "../../utils/emailTemplate.js";

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        await sendEmail(
            user.email,
            "Password Reset Successful ✅",
            emailTemplate(
                "Password Updated",
                `Hi ${user.name},<br>Your password has been updated successfully. If you didn’t request this, please contact our support immediately.`,
                "Login Now",
                process.env.CLIENT_URL + "/login"
            )
        );

        res.status(200).json({ message: "Password reset successful, you can now login" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default resetPassword;

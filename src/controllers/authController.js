import User from "../models/user.js";
import utils from "utils/Auth.js";
import cache from "..config/cache.js";
import { sendEmail, renderTemplate } from "../services/emailService.js"

async function createUser(userData){
    const checkEmailExists = await User.findOne({
        where: {email: userData.email},
    });
    if (checkEmailExists) throw new Error("User already exists");

    const newUser = await User.create(userData);
    return newUser;

    }

async function logUserIntoApp(loginCredentials){
    const user = await User.findOne({
        where: {email: loginCredentials.email},
    });
    if (!user) throw new Error("Invalid Email or Password");

    const isPasswordValid = await user.verifyPassword(loginCredentials.password);

    if(!isPasswordValid) throw new Error("Invalid Email or Password");

    const token = await utils.generateToken(user);
    await sendloginNotification(user);

    return {
        userId: user.user_id,
        email: user.email,
        fullname: user.full_name,
        role: user.role,
        gender: user.gender,
        token,

    }

}

async function sendloginNotification(user) {
    const html = await renderTemplate("loginNotification", {
        userName: user.full_name,
        email: user.email,
        loginTime: new Date().toLocaleString("en-US", { 
            dateStyle: "full",
            timeStyle: "short",
        }),
        device: "Backend Device",
    });

    const text = `Hello ${user.full_name},\n\nWe noticed a login to your account on ${new Date().toLocaleString("en-US")} If you did not make this attempt, please reset your password immediately.\n\nThank you,\nNutri-Smart Team`;
    await sendEmail(user.email, "New Login Notification", text, html);
}

export { createUser, logUserIntoApp };
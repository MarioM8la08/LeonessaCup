const FormData = require("form-data");
const Mailgun = require("mailgun.js");
require('dotenv').config({ path: './pass.env' });

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY,
    url: "https://api.eu.mailgun.net"
});
async function sendEmail(to, subject, content, isHtml = false, attachments = []) {
    try {
        const message = {
            from: "Leonessa Cup <postmaster@leonessacup.live>",
            to: [to],
            subject,
            [isHtml ? "html" : "text"]: content
        };

        // Add attachments if provided
        if (attachments.length > 0) {
            message.attachment = attachments.map(att => {
                if (Buffer.isBuffer(att.data)) {
                    return {
                        data: att.data,
                        filename: att.filename,
                        contentType: att.contentType || "application/octet-stream"
                    };
                } else if (typeof att.data === "string") {
                    return att.data; // File path
                } else {
                    throw new Error("Attachment data must be a Buffer or a file path.");
                }
            });
        }

        // Send the email
        const result = await mg.messages.create("leonessacup.live", message);
        console.log("Email sent successfully:", result);
        return result;
    } catch (error) {
        console.error("Error while sending email:", error);
        throw error;
    }
}
module.exports = sendEmail;
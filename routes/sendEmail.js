const FormData = require("form-data");
const Mailgun = require("mailgun.js");
const path = require("path");
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

        if (attachments.length > 0) {
            // Allegati come oggetti compatibili con Mailgun.js (usando built-in Attachment)
            message.attachment = attachments.map(att => new mg.Attachment({
                data: att.data, // Buffer
                filename: att.filename,
                contentType: att.contentType || "application/octet-stream"
            }));
        }

        const result = await mg.messages.create("leonessacup.live", message);
        console.log("Email inviata:", result);
        return result;
    } catch (error) {
        console.error("Errore durante l'invio:", error);
        throw error;
    }
}

module.exports = sendEmail;

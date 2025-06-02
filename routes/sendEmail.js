const fs = require("fs");
const FormData = require("form-data");
const Mailgun = require("mailgun.js");
const path = require("path");

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
    username: "api",
    key: "02984bee26dcda63516b21dd5a406c4c-08c79601-8853a447",
    url: "https://api.eu.mailgun.net"
});

async function sendEmail(to, subject, content, isHtml = false, attachments = []) {
    try {
        const message = {
            from: 'Leonessa Cup <postmaster@leonessacup.live>',
            to: [to],
            subject,
            [isHtml ? 'html' : 'text']: content,
        };

        if (attachments.length > 0) {
            // Passa gli allegati direttamente come array di oggetti con data e filename
            message.attachment = attachments.map(att => ({
                data: att.content, // Usa il buffer del PDF
                filename: att.filename,
                contentType: att.contentType || 'application/pdf' // Default a PDF
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

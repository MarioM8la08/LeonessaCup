const FormData = require("form-data");
const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
    username: "api",
    key: "02984bee26dcda63516b21dd5a406c4c-08c79601-8853a447", // <-- Inserisci qui la tua vera API key di Mailgun
    url: "https://api.eu.mailgun.net"
});

async function sendEmail(to, subject, content, isHtml = false, attachments = []) {
    try {
        const message = {
            from: 'Leonessa Cup <postmaster@sandbox707552b8698c48218c06c1b1911e19c3.mailgun.org>',
            to: [to],
            subject,
            [isHtml ? 'html' : 'text']: content,
        };

        if (attachments.length > 0) {
            message.attachment = attachments;
        }

        const result = await mg.messages.create("sandbox707552b8698c48218c06c1b1911e19c3.mailgun.org", message);
        console.log("Email inviata:", result);
        return result;
    } catch (error) {
        console.error("Errore durante l'invio:", error);
        throw error;
    }
}

module.exports = sendEmail;

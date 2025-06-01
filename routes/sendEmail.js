const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: "71398061@itiscastelli.onmicrosoft.com",
        pass: "NiVero3",
    }
});
async function sendEmail(to, subject, content, isHtml = false, attachments = []) {
    // Normalizza attachments
    const normalizedAttachments = Array.isArray(attachments)
        ? attachments
        : [attachments];

    const mailOptions = {
        from: '"Leonessa Cup" <71398061@itiscastelli.onmicrosoft.com>',
        to,
        subject,
        [isHtml ? 'html' : 'text']: content,
        attachments: normalizedAttachments
    };

    return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;

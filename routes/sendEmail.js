const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    secure: false,
    auth: {
        user: "mariom8la@leonessacup.live",
        pass: "d30ad1df4704be0b0ad4022fa2dd7e8c-08c79601-72bf022a",
    }
});

async function sendEmail(to, subject, content, isHtml = false, attachments = []) {
    // Normalizza attachments
    const normalizedAttachments = Array.isArray(attachments)
        ? attachments
        : [attachments];

    const mailOptions = {
        from: 'Leonessa Cup <mariom8la@leonessacup.live>',
        to,
        subject,
        [isHtml ? 'html' : 'text']: content,
        attachments: normalizedAttachments
    };

    return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;

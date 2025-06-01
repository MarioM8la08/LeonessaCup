const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    secure: false,
    auth: {
        user: "mariom8la@leonessacup.live",
        pass: "ab870d50cd0df47fedb41e81f732cea4-7c5e3295-26ff23a8",
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

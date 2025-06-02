async function sendEmail(to, subject, content, isHtml = false, attachments = []) {
    try {
        const message = {
            from: 'Leonessa Cup <postmaster@leonessacup.live>',
            to: [to],
            subject,
            [isHtml ? 'html' : 'text']: content,
        };

        if (attachments.length > 0) {
            // Validate and format attachments
            message.attachment = attachments.map(att => {
                if (!Buffer.isBuffer(att.content)) {
                    throw new TypeError('Attachment content must be a Buffer.');
                }
                return {
                    data: att.content, // Ensure this is a Buffer
                    filename: att.filename,
                    contentType: att.contentType || 'application/pdf',
                };
            });
        }

        const result = await mg.messages.create("leonessacup.live", message);
        console.log("Email sent successfully:", result);
        return result;
    } catch (error) {
        console.error("Error during email sending:", error);
        throw error;
    }
}
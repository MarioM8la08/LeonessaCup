const puppeteer = require('puppeteer');

async function generateTicketPDF(html) {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
        width: '80mm',
        height: '40mm',
        printBackground: true
    });
    await browser.close();
    return pdfBuffer;
}

module.exports = generateTicketPDF;

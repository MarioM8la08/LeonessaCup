const puppeteer = require('puppeteer');

async function generateTicketPDF(html) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    console.log('Generating PDF...');
    const pdfBuffer = await page.pdf({
        height: '40mm',
        printBackground: true
    });
    console.log('PDF generated, is Buffer:', Buffer.isBuffer(pdfBuffer));

    await browser.close();
    return pdfBuffer;
}

module.exports = generateTicketPDF;
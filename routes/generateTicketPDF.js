const puppeteer = require('puppeteer');

async function generateTicketPDF(html) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    console.log('HTML content:', html); // Debug HTML content
    await page.setContent(html, { waitUntil: 'networkidle0' });

    console.log('Generating PDF...');
    const pdfUint8Array = await page.pdf({
        width: '80mm', // Explicitly set the width
        height: '40mm', // Explicitly set the height
        printBackground: true
    });

    // Convert Uint8Array to Buffer
    const pdfBuffer = Buffer.from(pdfUint8Array);
    console.log('PDF Buffer:', pdfBuffer); // Debug PDF output
    console.log('PDF generated, is Buffer:', Buffer.isBuffer(pdfBuffer));

    await browser.close();
    return pdfBuffer;
}

module.exports = generateTicketPDF;
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #334155;
            background-color: #f8fafc;
        }
        .page {
            width: 794px;
            height: 1123px; /* A4 size */
            padding: 60px;
            box-sizing: border-box;
            background: white;
            position: relative;
            overflow: hidden;
        }
        .header {
            text-align: center;
            margin-bottom: 50px;
            border-bottom: 3px solid #6d28d9;
            padding-bottom: 30px;
        }
        .logo {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid #6d28d9;
            box-shadow: 0 4px 15px rgba(109,40,217,0.3);
        }
        h1 {
            color: #0f172a;
            font-size: 42px;
            margin: 20px 0 5px 0;
            letter-spacing: -1px;
        }
        .subtitle {
            color: #6d28d9;
            font-size: 16px;
            letter-spacing: 4px;
            font-weight: bold;
            margin: 0;
        }
        .hero {
            text-align: center;
            margin-bottom: 50px;
            background: #f1f5f9;
            padding: 30px;
            border-radius: 16px;
        }
        .hero h2 {
            font-size: 30px;
            color: #0f172a;
            margin-top: 0;
            margin-bottom: 15px;
        }
        .hero p {
            font-size: 18px;
            line-height: 1.6;
            color: #475569;
            max-width: 600px;
            margin: 0 auto;
        }
        .services {
            display: flex;
            justify-content: space-between;
            margin-bottom: 50px;
            gap: 20px;
        }
        .service-box {
            width: 33%;
            background: #ffffff;
            padding: 25px;
            border-radius: 12px;
            border-top: 5px solid #6d28d9;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }
        .service-box h3 {
            margin-top: 0;
            color: #6d28d9;
            font-size: 20px;
            font-weight: 800;
        }
        .service-box p {
            font-size: 15px;
            line-height: 1.6;
            color: #334155;
            margin-bottom: 0;
        }
        .portfolio {
            margin-bottom: 40px;
        }
        .portfolio h2 {
            text-align: center;
            font-size: 26px;
            margin-bottom: 25px;
            color: #0f172a;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 10px;
            display: inline-block;
            width: 100%;
        }
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .grid img {
            width: 100%;
            height: 220px;
            object-fit: cover;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        .footer {
            position: absolute;
            bottom: 60px;
            left: 60px;
            right: 60px;
            text-align: center;
            border-top: 1px solid #cbd5e1;
            padding-top: 20px;
            font-size: 14px;
            color: #64748b;
        }
        .accent {
            color: #6d28d9;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="page">
        <div class="header">
            <img src="https://rg-digital-studio.onrender.com/assets/img/logo.png" class="logo" />
            <h1>RG Digital Works</h1>
            <p class="subtitle">DESIGN &bull; DEVELOP &bull; GROW</p>
        </div>

        <div class="hero">
            <h2>Your Partner in Digital Excellence</h2>
            <p>We specialize in delivering premium digital experiences that drive measurable results. From strategic branding to scalable development, we build solutions that accelerate your business growth.</p>
        </div>

        <div class="services">
            <div class="service-box">
                <h3>Design</h3>
                <p>Strategic branding, UI/UX design, and stunning visual identities that capture attention and convert visitors into loyal customers.</p>
            </div>
            <div class="service-box">
                <h3>Develop</h3>
                <p>High-performance web applications built with scalable, secure, and modern technologies tailored to your exact business needs.</p>
            </div>
            <div class="service-box">
                <h3>Grow</h3>
                <p>Data-driven marketing, SEO optimization, and aggressive growth strategies to maximize your return on investment and market reach.</p>
            </div>
        </div>

        <div class="portfolio">
            <h2>Our Featured Work</h2>
            <div class="grid">
                <!-- Using live production URLs so the PDF generation reliably grabs the images -->
                <img src="https://rg-digital-studio.onrender.com/assets/img/logo1.jpeg" alt="Brand Identity" />
                <img src="https://rg-digital-studio.onrender.com/images/catloug%20RGDS_1.jpg" alt="Creative Design" />
            </div>
        </div>

        <div class="footer">
            <p>Ready to start your next big project? Contact us directly at <span class="accent">rgdigitalworks@gmail.com</span></p>
            <p>&copy; ${new Date().getFullYear()} RG Digital Works. All rights reserved. | Visit us at rgdigitalworks.com</p>
        </div>
    </div>
</body>
</html>
`;

async function createPDF() {
    console.log('Launching Puppeteer to generate Prospectus PDF...');
    try {
        const browser = await puppeteer.launch({ 
            headless: 'new',
            executablePath: '/Users/manas2506/.cache/puppeteer/chrome/mac_arm-150.0.7836.0/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        const pdfPath = path.join(__dirname, 'RG_Digital_Works_Prospectus.pdf');
        await page.pdf({ 
            path: pdfPath, 
            format: 'A4', 
            printBackground: true,
            margin: { top: '0', right: '0', bottom: '0', left: '0' }
        });
        
        await browser.close();
        console.log('Success! PDF generated at:', pdfPath);
    } catch (error) {
        console.error('Failed to generate PDF:', error);
    }
}

createPDF();

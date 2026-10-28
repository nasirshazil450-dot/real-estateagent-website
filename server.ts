import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// API health endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    agency: 'Majid Real Estate',
    location: 'G-11 Markaz, Islamabad',
    timestamp: new Date().toISOString()
  });
});

// API lead capture endpoint
app.post('/api/enquiry', (req, res) => {
  const { name, phone, email, interest, budget, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required.' });
  }

  const ref = `MRE-${Math.floor(100000 + Math.random() * 900000)}`;
  console.log(`[Lead Captured] Ref: ${ref} | Name: ${name} | Phone: ${phone} | Interest: ${interest}`);

  return res.json({
    success: true,
    ref,
    message: 'Enquiry received successfully.'
  });
});

// Serve production static assets from dist
const distPath = path.resolve(__dirname, 'dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // SPA fallback
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
} else {
  app.get('*', (_req, res) => {
    res.send(`
      <!doctype html>
      <html>
        <head><title>Majid Real Estate</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h2>Building assets...</h2>
          <p>Please run <code>npm run build</code> first.</p>
        </body>
      </html>
    `);
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`[Majid Real Estate] Server running on http://0.0.0.0:${port}`);
});

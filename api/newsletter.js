// Newsletter subscription API endpoints for Zokratiq
// Requires: npm install express sqlite3 nodemailer crypto dotenv

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'subscribers.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    token TEXT,
    tokenExpires INTEGER,
    utm_source TEXT,
    referrer TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    activatedAt DATETIME,
    unsubscribedAt DATETIME
  )`);
});

// Rate limiting storage
const rateLimits = new Map();

// Email configuration (replace with your SMTP settings)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Rate limiting helper
function checkRateLimit(ip, email) {
  const now = Date.now();
  const hourAgo = now - 60 * 60 * 1000;
  
  // Clean old entries
  for (const [key, data] of rateLimits.entries()) {
    if (data.timestamp < hourAgo) {
      rateLimits.delete(key);
    }
  }
  
  // Check IP rate limit (10 per hour)
  const ipKey = `ip:${ip}`;
  const ipData = rateLimits.get(ipKey) || { count: 0, timestamp: now };
  if (ipData.count >= 10 && ipData.timestamp > hourAgo) {
    return false;
  }
  
  // Check email rate limit (3 per hour)
  const emailKey = `email:${email}`;
  const emailData = rateLimits.get(emailKey) || { count: 0, timestamp: now };
  if (emailData.count >= 3 && emailData.timestamp > hourAgo) {
    return false;
  }
  
  // Update counters
  rateLimits.set(ipKey, { count: ipData.count + 1, timestamp: now });
  rateLimits.set(emailKey, { count: emailData.count + 1, timestamp: now });
  
  return true;
}

// Email templates
function getConfirmationEmailTemplate(confirmLink, unsubLink) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>One last ritual — confirm your subscription to Zokratiq</title>
    <style>
        body { font-family: 'Crimson Text', Georgia, serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #4ECDC4; margin-bottom: 5px; }
        .tagline { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; }
        .content { margin: 30px 0; }
        .cta-button { display: inline-block; background: #4ECDC4; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
        .cta-button:hover { background: #45B7B8; }
        .footer { margin-top: 40px; font-size: 14px; color: #666; border-top: 1px solid #eee; padding-top: 20px; }
        .unsubscribe { font-size: 12px; color: #999; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">Zokratiq</div>
        <div class="tagline">Reality Exploration Studio</div>
    </div>
    
    <div class="content">
        <p>Hello —</p>
        
        <p>This inbox just became a gate. Click the link below to confirm you want artifacts that nudge reality:</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmLink}" class="cta-button">Confirm my subscription — activate the craft</a>
        </div>
        
        <p>If the button fails, paste this link into your browser:<br>
        <a href="${confirmLink}" style="color: #4ECDC4; word-break: break-all;">${confirmLink}</a></p>
        
        <p><strong>What you'll get:</strong> new artifacts, prompts, and tools — not noise. Delivered infrequently, intentionally.</p>
        
        <p>If you didn't ask for this, ignore this message or safely uninvite yourself: <a href="${unsubLink}" style="color: #999;">unsubscribe</a></p>
    </div>
    
    <div class="footer">
        <p>See you on the other side,<br/>
        — Zokratiq / Reality Exploration Studio</p>
        
        <p><strong>P.S.</strong> add us to your safe senders. This is where the useful things hide.</p>
    </div>
    
    <div class="unsubscribe">
        <p>List-Id: Zokratiq Reality Exploration Studio &lt;zokratiq@zokratiq.com&gt;<br/>
        <a href="${unsubLink}">Unsubscribe</a> | <a href="https://zokratiq.com/privacy">Privacy Policy</a></p>
    </div>
</body>
</html>`;

  const text = `Hello —

This inbox just became a gate. Click the link below to confirm you want artifacts that nudge reality:

${confirmLink}

What you'll get: new artifacts, prompts, and tools — not noise. Delivered infrequently, intentionally.

If you didn't ask for this, ignore this message or safely uninvite yourself: ${unsubLink}

See you on the other side,
— Zokratiq / Reality Exploration Studio

P.S. add us to your safe senders. This is where the useful things hide.`;

  return { html, text };
}

// POST /api/subscribe
app.post('/api/subscribe', async (req, res) => {
  const { email, website, utm_source, referrer } = req.body;
  const clientIp = req.ip || req.connection.remoteAddress;

  // Honeypot check
  if (website && website.trim() !== '') {
    return res.status(400).json({ message: 'Bot detected' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  // Rate limiting
  if (!checkRateLimit(clientIp, email)) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }

  try {
    // Check if email already exists
    const existingUser = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM subscribers WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (existingUser) {
      if (existingUser.status === 'active') {
        return res.status(200).json({ message: 'Already subscribed' });
      }
      if (existingUser.status === 'pending') {
        // Resend confirmation email
        const token = existingUser.token;
        const confirmLink = `https://zokratiq.com/api/confirm?token=${token}`;
        const unsubLink = `https://zokratiq.com/api/unsubscribe?token=${token}`;
        
        const emailTemplate = getConfirmationEmailTemplate(confirmLink, unsubLink);
        
        await transporter.sendMail({
          from: '"Zokratiq" <hello@zokratiq.com>',
          to: email,
          subject: 'One last ritual — confirm your subscription to Zokratiq',
          text: emailTemplate.text,
          html: emailTemplate.html,
          headers: {
            'List-Id': 'Zokratiq Reality Exploration Studio <zokratiq@zokratiq.com>',
            'List-Unsubscribe': `<${unsubLink}>`
          }
        });
        
        return res.status(200).json({ message: 'Confirmation email resent' });
      }
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpires = Date.now() + 48 * 60 * 60 * 1000; // 48 hours

    // Insert or update subscriber
    await new Promise((resolve, reject) => {
      const sql = existingUser 
        ? 'UPDATE subscribers SET status = ?, token = ?, tokenExpires = ?, utm_source = ?, referrer = ? WHERE email = ?'
        : 'INSERT INTO subscribers (email, status, token, tokenExpires, utm_source, referrer) VALUES (?, ?, ?, ?, ?, ?)';
      
      const params = existingUser
        ? ['pending', token, tokenExpires, utm_source, referrer, email]
        : [email, 'pending', token, tokenExpires, utm_source, referrer];

      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve();
      });
    });

    // Send confirmation email
    const confirmLink = `https://zokratiq.com/api/confirm?token=${token}`;
    const unsubLink = `https://zokratiq.com/api/unsubscribe?token=${token}`;
    
    const emailTemplate = getConfirmationEmailTemplate(confirmLink, unsubLink);
    
    await transporter.sendMail({
      from: '"Zokratiq" <hello@zokratiq.com>',
      to: email,
      subject: 'One last ritual — confirm your subscription to Zokratiq',
      text: emailTemplate.text,
      html: emailTemplate.html,
      headers: {
        'List-Id': 'Zokratiq Reality Exploration Studio <zokratiq@zokratiq.com>',
        'List-Unsubscribe': `<${unsubLink}>`
      }
    });

    res.status(201).json({ message: 'Confirmation email sent' });

  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/confirm
app.get('/api/confirm', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.redirect('/zokratiq/subscribe-expired');
  }

  try {
    // Find subscriber by token
    const subscriber = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM subscribers WHERE token = ?', [token], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!subscriber || subscriber.tokenExpires < Date.now()) {
      return res.redirect('/zokratiq/subscribe-expired');
    }

    // Activate subscription
    await new Promise((resolve, reject) => {
      db.run(
        'UPDATE subscribers SET status = ?, token = NULL, tokenExpires = NULL, activatedAt = CURRENT_TIMESTAMP WHERE id = ?',
        ['active', subscriber.id],
        function(err) {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    // Redirect to welcome page with analytics trigger
    res.redirect('/zokratiq/welcome?source=confirmed');

  } catch (error) {
    console.error('Confirm error:', error);
    res.redirect('/zokratiq/subscribe-expired');
  }
});

// POST /api/unsubscribe
app.post('/api/unsubscribe', async (req, res) => {
  const { email, token } = req.body;

  try {
    let sql, params;
    
    if (token) {
      sql = 'UPDATE subscribers SET status = ?, unsubscribedAt = CURRENT_TIMESTAMP WHERE token = ?';
      params = ['unsubscribed', token];
    } else if (email) {
      sql = 'UPDATE subscribers SET status = ?, unsubscribedAt = CURRENT_TIMESTAMP WHERE email = ?';
      params = ['unsubscribed', email];
    } else {
      return res.status(400).json({ message: 'Email or token required' });
    }

    await new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve();
      });
    });

    res.status(200).json({ message: 'Successfully unsubscribed' });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/unsubscribe (for email links)
app.get('/api/unsubscribe', async (req, res) => {
  const { token, email } = req.query;

  try {
    let sql, params;
    
    if (token) {
      sql = 'UPDATE subscribers SET status = ?, unsubscribedAt = CURRENT_TIMESTAMP WHERE token = ?';
      params = ['unsubscribed', token];
    } else if (email) {
      sql = 'UPDATE subscribers SET status = ?, unsubscribedAt = CURRENT_TIMESTAMP WHERE email = ?';
      params = ['unsubscribed', email];
    } else {
      return res.status(400).send('Invalid unsubscribe link');
    }

    await new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve();
      });
    });

    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unsubscribed - Zokratiq</title>
    <style>
        body { font-family: 'Crimson Text', Georgia, serif; line-height: 1.6; color: #333; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; }
        .logo { font-size: 24px; font-weight: bold; color: #4ECDC4; margin-bottom: 20px; }
        .message { font-size: 18px; margin: 30px 0; }
        .back-link { color: #4ECDC4; text-decoration: none; }
        .back-link:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="logo">Zokratiq</div>
    <div class="message">
        <h2>You've been unsubscribed.</h2>
        <p>No more artifacts from us. If you change your mind, you know where to find us.</p>
        <p><a href="https://zokratiq.com/" class="back-link">← Return to Zokratiq</a></p>
    </div>
</body>
</html>`);

  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).send('Error processing unsubscribe request');
  }
});

// Export for serverless or express usage
module.exports = app;

// For standalone usage
if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Newsletter API server running on port ${PORT}`);
  });
}
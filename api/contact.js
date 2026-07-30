import { sendContactToTelegram } from '../src/api/contactTelegram.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { name, phone, plan, price } = req.body || {};

    if (!name || !phone) {
      res.status(400).json({ error: 'Name and phone are required' });
      return;
    }

    await sendContactToTelegram({
      name,
      phone,
      plan,
      price,
      userAgent: req.headers['user-agent'] || '',
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact submission failed:', error);
    res.status(500).json({ error: error.message || 'Could not send contact message' });
  }
}

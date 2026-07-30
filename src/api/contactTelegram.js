import 'dotenv/config';
import { URLSearchParams } from 'url';

export function parseChatIds(chatIds) {
  return (chatIds || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

export function buildContactMessage({ name, phone, plan, price, userAgent }) {
  const lines = [
    '📩 New contact form submission',
    `👤 Name: ${name}`,
    `📞 Phone: ${phone}`,
    plan ? `📦 Plan: ${plan}` : null,
    price ? `💶 Price: ${price}` : null,
    userAgent ? `🧭 User Agent: ${userAgent}` : null,
    `🕒 Submitted at: ${new Date().toISOString()}`,
  ].filter(Boolean);

  return lines.join('\n');
}

export async function sendContactToTelegram({ name, phone, plan, price, userAgent }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = parseChatIds(process.env.TELEGRAM_CHAT_ID);

  if (!token || chatIds.length === 0) {
    throw new Error('Telegram bot is not configured. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.');
  }

  const message = buildContactMessage({ name, phone, plan, price, userAgent });

  const results = [];
  for (const chatId of chatIds) {
    const body = new URLSearchParams({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    });

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Telegram send failed for chat ${chatId}: ${response.status} ${errorText}`);
    }

    results.push(await response.json());
  }

  return results;
}

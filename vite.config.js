
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import { sendContactToTelegram } from './src/api/contactTelegram.js'

function contactApiPlugin() {
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', async () => {
          try {
            const { name, phone, plan, price } = JSON.parse(body || '{}')

            if (!name || !phone) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Name and phone are required' }))
              return
            }

            await sendContactToTelegram({
              name,
              phone,
              plan,
              price,
              userAgent: req.headers['user-agent'] || '',
            })

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true }))
          } catch (error) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: error.message || 'Could not send contact message' }))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error', // Suppress warnings, only show errors
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    contactApiPlugin(),
  ]
});
// Configuration for webhook
// Copy this file to config.js and update with your webhook URL

const CONFIG = {
    // Replace this with your webhook URL
    WEBHOOK_URL: 'https://webhook.site/86c2effa-a8ca-4e87-880f-c8d99486a17d',

    // Examples:
    // Make.com: 'https://hook.us1.make.com/YOUR_ID'
    // Zapier: 'https://hooks.zapier.com/hooks/catch/YOUR_ID'
    // Webhook.site: 'https://webhook.site/YOUR_UNIQUE_ID'
    // n8n: 'https://your-n8n-instance.com/webhook/YOUR_ID'

    // Optional: Add any headers your webhook needs
    WEBHOOK_HEADERS: {
        'Content-Type': 'application/json'
        // Add more headers if needed, e.g.:
        // 'Authorization': 'Bearer YOUR_TOKEN'
    }
};

# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to https://emailjs.com
2. Sign up for a free account

## Step 2: Create Email Service
1. Go to "Email Services" in dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow setup instructions
5. Note the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to "Email Templates" in dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Message from {{from_name}}

Hello SPEC Team,

You have received a new message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from the Electrothon website contact form.
```

4. Note the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key
1. Go to "Account" > "General"
2. Copy your **Public Key** (e.g., `abcd1234efgh5678`)

## Step 5: Update Configuration
Edit `src/lib/emailjs-config.js`:

```javascript
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'your_actual_public_key',
  SERVICE_ID: 'your_actual_service_id', 
  TEMPLATE_ID: 'your_actual_template_id'
};
```

## Step 6: Test
1. Deploy the changes
2. Test the contact form
3. Check your email for messages

## Template Variables Used:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email  
- `{{message}}` - Message content
- `{{reply_to}}` - Reply-to email
- `{{to_name}}` - Recipient name
- `{{to_email}}` - Recipient email
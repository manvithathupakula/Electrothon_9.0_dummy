# EmailJS Configuration for Static Deployment

Since this is deployed as a static site, environment variables are not available. You need to configure EmailJS directly in the code.

## Setup Steps:

1. **Create EmailJS Account**: Go to https://emailjs.com and create an account

2. **Get Your Keys**:
   - Public Key: Found in EmailJS dashboard under "Account" > "API Keys"
   - Service ID: Create an email service (Gmail, Outlook, etc.)
   - Template ID: Create an email template

3. **Update the Code**:
   Edit `src/components/ui/ContactUs1.jsx` and replace:
   ```javascript
   const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY';
   const serviceId = 'YOUR_EMAILJS_SERVICE_ID';
   const templateId = 'YOUR_EMAILJS_TEMPLATE_ID';
   ```

4. **Template Variables**:
   Your EmailJS template should include these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Message content
   - `{{to_email}}` - Recipient email (community.spec@gmail.com)

## Security Note:
EmailJS public keys are safe to expose in client-side code as they're designed for frontend use.
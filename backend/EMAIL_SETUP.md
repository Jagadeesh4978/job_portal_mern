# Email Setup Guide for OTP

## Overview
The application uses Nodemailer to send OTP emails for password reset functionality.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install nodemailer
```

### 2. Configure Gmail (Recommended for Testing)

#### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification

#### Step 2: Generate App Password
1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer"
3. Google will generate a 16-character password
4. Copy the password (without spaces)

#### Step 3: Configure .env File
Create a `.env` file in the backend folder:

```env
MONGODB_URI=mongodb://localhost:27017/job_portal
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

Replace:
- `your-email@gmail.com` with your Gmail address
- `xxxx xxxx xxxx xxxx` with the 16-character app password (copy exactly as shown)

### 3. Alternative Email Services

#### Using SendGrid
```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_USER=noreply@yourapp.com
```

#### Using Mailgun
```env
EMAIL_SERVICE=mailgun
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_mailgun_domain
EMAIL_USER=noreply@yourapp.com
```

### 4. Test Email Sending

1. Start the backend server:
```bash
npm run dev
```

2. Use the forgot password feature:
   - Go to `/forgot-password`
   - Enter your email
   - Check your inbox for the OTP email

### 5. Troubleshooting

#### Issue: "Invalid login" error
- Make sure 2-Factor Authentication is enabled
- Use the App Password, not your Gmail password
- Copy the password exactly as shown (with spaces if displayed)

#### Issue: "Less secure app access"
- Google has deprecated this option
- Use App Passwords instead (steps above)

#### Issue: Email not received
- Check spam/junk folder
- Wait a few seconds (emails may take time)
- Check backend console for error messages
- Verify EMAIL_USER and EMAIL_PASSWORD in .env

#### Issue: "nodemailer not found"
- Run `npm install nodemailer` in the backend folder
- Verify it's added to package.json

### 6. Email Features

The application sends two types of emails:

#### Welcome Email (on Registration)
- Sent automatically after successful registration
- Contains welcome message and getting started tips

#### OTP Email (on Password Reset)
- Sent when user requests password reset
- Contains 6-digit OTP valid for 10 minutes
- Includes security warnings

### 7. Production Considerations

For production deployment:
- Use a dedicated email service (SendGrid, AWS SES, Mailgun)
- Never expose email credentials in code
- Use environment variables for all sensitive data
- Monitor email delivery rates
- Set up bounce and complaint handling
- Consider email templates for better branding

### 8. Gmail Limitations

- 500 emails per day limit
- Recommended for development/testing only
- Use dedicated email service for production

## Questions?

If you encounter issues, check:
1. `.env` file exists and has correct values
2. 2FA is enabled and App Password is generated
3. Backend console for error messages
4. Email spam/junk folder

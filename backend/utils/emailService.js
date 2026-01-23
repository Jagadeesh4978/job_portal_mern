const nodemailer = require('nodemailer');

// Create transporter (configure with your email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password',
  },
});

// Send OTP Email
exports.sendOTPEmail = async (email, otp, userName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@jobportal.com',
      to: email,
      subject: 'Password Reset OTP - Job Portal',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #667eea; padding: 20px; border-radius: 8px 8px 0 0; color: white; text-align: center;">
            <h1>Job Portal</h1>
          </div>
          <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #333; margin-bottom: 20px;">Password Reset Request</h2>
            
            <p style="color: #666; font-size: 16px; margin-bottom: 15px;">
              Hi ${userName || 'User'},
            </p>
            
            <p style="color: #666; font-size: 16px; margin-bottom: 25px;">
              We received a request to reset your password. Please use the OTP below to proceed:
            </p>
            
            <div style="background-color: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
              <p style="color: #999; font-size: 14px; margin: 0 0 10px 0;">Your OTP Code:</p>
              <p style="color: #667eea; font-size: 36px; font-weight: bold; margin: 0; letter-spacing: 5px;">${otp}</p>
              <p style="color: #999; font-size: 12px; margin: 10px 0 0 0;">Valid for 10 minutes</p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 25px; margin-bottom: 10px;">
              <strong>Important:</strong> Never share this OTP with anyone. We will never ask for your OTP.
            </p>
            
            <p style="color: #999; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
              If you didn't request a password reset, you can safely ignore this email.
            </p>
            
            <p style="color: #999; font-size: 12px; margin-top: 10px;">
              Best regards,<br/>
              Job Portal Team
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error.message);
    return false;
  }
};

// Send Welcome Email
exports.sendWelcomeEmail = async (email, userName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@jobportal.com',
      to: email,
      subject: 'Welcome to Job Portal',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #667eea; padding: 20px; border-radius: 8px 8px 0 0; color: white; text-align: center;">
            <h1>Job Portal</h1>
          </div>
          <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #333; margin-bottom: 20px;">Welcome to Job Portal!</h2>
            
            <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
              Hi ${userName},
            </p>
            
            <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
              Your account has been successfully created. You can now explore job opportunities, apply for positions, and build your career with us.
            </p>
            
            <div style="background-color: white; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0;">
              <p style="color: #333; font-weight: bold; margin: 0 0 10px 0;">Get Started:</p>
              <ul style="color: #666; margin: 0; padding-left: 20px;">
                <li>Complete your profile</li>
                <li>Browse available jobs</li>
                <li>Apply for positions</li>
                <li>Save jobs for later</li>
              </ul>
            </div>
            
            <p style="color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              Best regards,<br/>
              Job Portal Team
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error.message);
    return false;
  }
};

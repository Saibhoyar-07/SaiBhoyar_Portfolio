import { Request, Response } from 'express';
import Contact from '../models/Contact';
import { isMongoConnected } from '../config/db';
import nodemailer from 'nodemailer';

export const createContactMessage = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Name, email, subject and message are required.' });
  }

  let savedMessage = null;

  if (isMongoConnected) {
    try {
      savedMessage = await Contact.create({ name, email, subject, message });
    } catch (dbErr: any) {
      console.error('MongoDB save failed, switching to memory fallback:', dbErr);
    }
  }

  if (!savedMessage) {
    savedMessage = {
      _id: `mock_${Date.now()}`,
      name,
      email,
      subject,
      message,
      read: false,
      createdAt: new Date(),
    };
  }

  // SMTP Email Notification
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'password') {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"Portfolio Alerts" <${process.env.EMAIL_USER}>`,
        to: process.env.NOTIFICATION_EMAIL || 'saibhoyar12345@gmail.com',
        subject: `New Portfolio Message: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `<h3>New Portfolio Inquiry</h3>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Subject:</strong> ${subject}</p>
               <p><strong>Message:</strong></p>
               <p style="padding: 10px; background-color: #f3f4f6; border-radius: 6px;">${message.replace(/\n/g, '<br>')}</p>`,
      };

      await transporter.sendMail(mailOptions);
      console.log('✉️ [Email]: Notification email dispatched.');
    } catch (mailErr: any) {
      console.warn(`⚠️ [Email]: Failed to send notification email: ${mailErr.message}`);
    }
  } else {
    console.log('✉️ [Email Bypass]: No email setup or default password. Message details logged below:');
    console.log(`[Mail details]: Subject: New Portfolio Message: ${subject}; Sender: ${name} (${email}); Message: ${message}`);
  }

  return res.status(201).json(savedMessage);
};


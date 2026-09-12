import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

interface ContactDocument {
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const contactSchema = new mongoose.Schema<ContactDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Contact = mongoose.models.Contact as mongoose.Model<ContactDocument> || mongoose.model<ContactDocument>('Contact', contactSchema);

async function connectToDatabase() {
  const uri = process.env.MONGO_URI;

  if (!uri) return false;
  if (mongoose.connection.readyState === 1) return true;

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const { name, email, subject, message } = req.body || {};

  if (![name, email, subject, message].every((value) => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ message: 'Name, email, subject and message are required.' });
  }

  let savedMessage: unknown = null;

  try {
    if (await connectToDatabase()) {
      savedMessage = await Contact.create({ name, email, subject, message });
    }
  } catch (error) {
    console.warn('MongoDB save failed:', error);
  }

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: Number(process.env.EMAIL_PORT || 587),
        secure: Number(process.env.EMAIL_PORT || 587) === 465,
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      await transporter.sendMail({
        from: `"Portfolio Alerts" <${process.env.EMAIL_USER}>`,
        to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
        replyTo: email,
        subject: `New Portfolio Message: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      });
    } catch (error) {
      console.warn('Email notification failed:', error);
    }
  }

  return res.status(201).json(savedMessage || { message: 'Message received successfully.' });
}

import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { verifyAccountTemplate } from '../utils/emailTemplateUtils';

dotenv.config();
export interface EmailInterface {
  receiverEmail: string;
  action: string;
  url?: string;
}

export const smtpGmailSendEmail = async (email: EmailInterface): Promise<void> => {
  const transporter = await nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    logger:false,
    debug:false,
    auth: {
      user: process.env.SMTP_GMAIL_SENDER_EMAIL,
      pass: process.env.SMTP_GMAIL_SENDER_PASSWORD
    },
  });

  if(email?.action ==='Verification Account') return await transporter.sendMail(verifyAccountTemplate(email?.receiverEmail, email?.action, email?.url));

  return;
};

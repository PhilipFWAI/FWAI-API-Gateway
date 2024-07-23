import { SendMailOptions } from 'nodemailer';

export const verifyAccountTemplate = (receiverEmail: string, action: string, url: string): SendMailOptions => {
    return {
        to: receiverEmail,
        text: 'Hello From Gateway',
        subject: `Gateway ${action}`,
        from: `Gateway <${process.env.SENDER_EMAIL}>`,
        html: `<table style="max-width: 700px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <tr>
                <td>
                    <h2 style="color: #333333; margin: 0;">Email Verification</h2>
                    <p style="color: #666666;">Thank you for signing up! To complete your registration, please verify your email address.</p>
                    <a href=${url} style="display: inline-block; margin: 20px 0; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px; transition: background-color 0.3s ease;" target="_blank">Verify Email Address</a>
                    <p style="color: #666666;">If Verify Email Address button is not working, use the link below to verify your account.</p>
                    <a href=${url} style="color: #666666;">${url}</a>
                    </p>
                    <p style="margin-top: 20px; color: #999999;">If you did not sign up for our service, please ignore this email.</p>
                </td>
            </tr>
          </table>`,
    };
};

'use server'

import nodemailer from "nodemailer";

export async function sendMail({ from, to, cc, bcc, subject, html, name, replyTo, attachments, host, port, user, pass } : {
    from?: string;
    to: string;
    cc?: string;
    bcc?: string;
    subject?: string;
    html: string;
    name?: string;
    replyTo?: string;
    attachments?: any[];
    host?: string;
    port?: string;
    user?: string;
    pass?: string;
}){
    const SMTP_EMAIL = 'geral@workdeeal.com';
    const SMTP_PASS = '$w0rkDe3al';
    const EMAIL_SALES = 'comercial@workdeeal.com';

    if (!SMTP_EMAIL || !SMTP_PASS) {
        console.error('SMTP credentials are missing. Please check your environment variables.');
        return "failed"
    }

    const transport = nodemailer.createTransport({
        host: host ?? 'smtp.hostinger.com',
        secure: true, 
        port: port ? parseInt(port) : 465,
        auth: {
            user: user ?? SMTP_EMAIL,
            pass: pass ?? SMTP_PASS
        },
        debug: true,
    });

    try {
        // Verify SMTP connection configuration
        await transport.verify();

        const sendResult = await transport.sendMail({
            from: `Memorize <geral@workdeeal.com>`,
            to: to,
            subject: subject,
            html: html,
        });

        return "success";

    } catch(error) {
        console.error('Failed to send email:', error);
        return "failed"
    }
}
import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

export class NodemailerMailAdapter implements MailAdapter{
  async sendMail({subject, body}: SendMailData){
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "84749511de08ba",
        pass: "9eb53b53c73a32"
      }
    });
    await transport.sendMail({
    from: 'Equipe FeedWidget <feedwidget@gmil.com>',
    to: 'Gleydson <gleydsond.dev@gmil.com>',
    subject,
    html: body
  })
  }
}
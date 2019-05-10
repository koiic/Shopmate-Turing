import { config } from 'dotenv';
import sgMail from '@sendgrid/mail';

config();

// method for sending mail;
const mailSender = (mailObject) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail.send(mailObject);
};

export default mailSender;

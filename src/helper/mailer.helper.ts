import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();
const {
  EMAIL_SERVICE_HOST,
  EMAIL_SERVICE_PORT,
  EMAIL_SERVICE_USER,
  EMAIL_SERVICE_PASSWORD,
  EMAIL_FROM,
} = process.env;
const transport = nodemailer.createTransport({
  host: EMAIL_SERVICE_HOST,
  port: Number(EMAIL_SERVICE_PORT),
  auth: {
    user: EMAIL_SERVICE_USER,
    pass: EMAIL_SERVICE_PASSWORD,
  },
});

const sendMail = async (to: string, subject: string, text: string) => {
  await transport.sendMail({
    from: EMAIL_FROM,
    to,
    subject,
    text,
  });
};

export { sendMail };

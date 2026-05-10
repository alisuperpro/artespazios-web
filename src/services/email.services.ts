import nodemailer from "nodemailer"
import { EMAIL_CONF } from "../config/email.config"

export const sendEmail = async ({
  to,
  subject,
  template,
}: {
  to: string
  subject: string
  template: string
}) => {
  const transporter = await createDynamicTransporter({
    host: EMAIL_CONF.host,
    port: Number(EMAIL_CONF.port),
    user: EMAIL_CONF.email,
    fromName: EMAIL_CONF.name,
    pass: EMAIL_CONF.pass,
  })

  const mailOptions = {
    from: `"${EMAIL_CONF.name}" <${EMAIL_CONF.email}>`,
    to,
    subject,
    html: template,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("Email enviado: " + info.messageId)
    return info
  } catch (error) {
    console.error("Error enviando email:", error)
    throw error
  }
}
export interface EmailConfig {
  host: string
  port: number
  user: string
  pass: string
  fromName: string
}

const createDynamicTransporter = async (config: EmailConfig) => {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 60000,
  })

  return transporter
}

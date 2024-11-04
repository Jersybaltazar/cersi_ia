'use server'
import nodemailer from 'nodemailer';

export const onSendContactEmail = async (data: {
  nombre: string;
  email: string;
  telefono: string;
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODE_MAILER_EMAIL,
      to: process.env.NODE_MAILER_EMAIL, 
      subject: 'Mensaje Importante de Empresa',
      html: `
        <p><strong>Nombre:</strong> ${data.nombre}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Teléfono:</strong> ${data.telefono}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return { status: 200, message: 'Mensaje enviado correctamente' };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('Error al enviar el correo');
  }
};

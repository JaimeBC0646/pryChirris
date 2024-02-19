import nodemailer from "nodemailer"

// Configuración del transporte SMTP
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: '20210646@uthh.edu.mx',
        pass: 'bfhy jzvb xhks xqku'
    }
});
































/*
CODIGO DE APLICACION -> chirrisOnline.com
pass: 'bfhy jzvb xhks xqku'
*/
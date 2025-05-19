import nodemailer from 'nodemailer';
import {EMAIL_PASSWORD} from '../config/env.js'

export const accountEmail = 'hariommg1706@gmail.com'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: accountEmail,
        pass: EMAIL_PASSWORD
    }
})

export default transporter;
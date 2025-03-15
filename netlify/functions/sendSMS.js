require('dotenv').config();
// netlify/functions/sendSMS.js
const twilio = require('twilio');

// Ganti dengan kredensial Twilio kamu
const accountSid = 'AC8166ee4d1a1a223265f8b741bb81c70d';  // Dapatkan dari Twilio Console
const authToken = 'ccb4de20949d0d46d44abe489da72ba9';    // Dapatkan dari Twilio Console

const client = new twilio(accountSid, authToken);

exports.handler = async (event, context) => {
  const { phoneNumber } = JSON.parse(event.body); // Ambil nomor telepon dari request body

  try {
    // Kirim pesan WhatsApp
    const message = await client.messages.create({
      body: 'Your verification code is: 123456',
      from: 'whatsapp:+18509207352', // Nomor Twilio WhatsApp
      to: `whatsapp:+6289630299113`
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'WhatsApp sent successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send WhatsApp', error: error.message })
    };
  }
};

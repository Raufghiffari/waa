require('dotenv').config();
const twilio = require('twilio');

// Ganti dengan kredensial Twilio kamu
const accountSid = 'AC8166ee4d1a1a223265f8b741bb81c70d';  // Dapatkan dari Twilio Console
const authToken = 'ccb4de20949d0d46d44abe489da72ba9';    // Dapatkan dari Twilio Console

const client = new twilio(accountSid, authToken);

exports.handler = async (event, context) => {
  const { phoneNumber } = JSON.parse(event.body); // Mengambil nomor telepon dari request body
  
  console.log("Received phone number:", phoneNumber);  // Log nomor telepon yang diterima

  try {
    // Kirim pesan WhatsApp dengan pilihan tombol confirm dan cancel
    console.log("Sending WhatsApp message...");

    const message = await client.messages.create({
      body: 'Hi, this is an automated response from the bot, to confirm that you want to submit a collab request.',
      from: 'whatsapp:+18509207352', // Nomor Twilio WhatsApp
      to: `whatsapp:+${phoneNumber}`, // Nomor yang akan dikirim pesan
      persistentAction: [
        'confirm',
        'cancel'
      ],
      interactive: {
        type: 'button',
        body: 'Please select between confirm and cancel.',
        buttons: [
          {
            type: 'quick_reply',
            title: 'Confirm',
            value: 'confirm'
          },
          {
            type: 'quick_reply',
            title: 'Cancel',
            value: 'cancel'
          }
        ]
      }
    });

    console.log("WhatsApp message sent successfully:", message.sid);  // Log SID pesan yang berhasil dikirim

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'WhatsApp sent successfully' })
    };
  } catch (error) {
    console.error("Error sending WhatsApp:", error);  // Log jika terjadi error
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send WhatsApp', error: error.message })
    };
  }
};

const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Command handler for /start command
bot.command('start', (ctx) => {
  // Extract username from the context
  const username = ctx.message.from.username;

  // Send the main menu with an image and text
  sendMainMenu(ctx, username);
});

// Function to send the main menu with an image
function sendMainMenu(ctx, username) {
  // URL of the image
  const imageUrl = 'https://i.ibb.co/3pkG5Cw/photo-2024-08-26-13-23-22.jpg'; // Replace with your image URL

  // Send the image with a caption first
  ctx.replyWithPhoto(imageUrl, {
    caption: `<b>How cool is your Telegram profile?</b>\nCheck your rating and receive rewards 🦴`,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [{ text: '🕹 Play Game', web_app: { url: 'https://aistakt.com/' } }],
        [{ text: 'ℹ️ Join Our Community', url: 'https://t.me/dogs_community' }]
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  });
}

// Handling data received from the web app
bot.on('message', (ctx) => {
  if (ctx.message.web_app) {
    const data = JSON.parse(ctx.message.web_app.data);
    ctx.reply(`Received data from web app: ${JSON.stringify(data)}`);
  }
});

bot.launch();

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

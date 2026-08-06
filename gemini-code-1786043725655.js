const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// 1. تشغيل سيرفر بسيط ليظل البوت شغالاً مجاناً
const app = express();
app.get('/', (req, res) => res.send('Bot is Alive!'));
app.listen(3000, () => console.log('Server is ready!'));

// 2. إعدادات البوت
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => {
  console.log(`تم تسجيل الدخول بنجاح باسم: ${client.user.tag}`);
});

// أمر تجريبي للتاكد من أن البوت يعمل (سواء بسلاش أو بالبادئة !)
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.content === '!ping' || message.content === '!بنج') {
    message.reply('بونج! 🏓 البوت شغال تمام.');
  }
});

// تسجيل الدخول بالتوكن
client.login(process.env.DISCORD_TOKEN);
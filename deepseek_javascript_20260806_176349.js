require('dotenv').config();
const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// أوامر بسيطة
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  
  new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Say hello to the bot'),
  
  new SlashCommandBuilder()
    .setName('server')
    .setDescription('Get server info'),
  
  new SlashCommandBuilder()
    .setName('user')
    .setDescription('Get user info'),
].map(command => command.toJSON());

// تسجيل الأوامر
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('Slash commands registered!');
  } catch (error) {
    console.error(error);
  }
})();

// أحداث البوت
client.once('ready', () => {
  console.log(`${client.user.tag} is online!`);
  client.user.setActivity('!help', { type: 'WATCHING' });
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong! 🏓');
  }
  
  else if (interaction.commandName === 'hello') {
    await interaction.reply(`Hello ${interaction.user.username}! 👋`);
  }
  
  else if (interaction.commandName === 'server') {
    await interaction.reply(`Server: ${interaction.guild.name}\nMembers: ${interaction.guild.memberCount}`);
  }
  
  else if (interaction.commandName === 'user') {
    await interaction.reply(`Username: ${interaction.user.tag}\nID: ${interaction.user.id}\nCreated: ${interaction.user.createdAt}`);
  }
});

// رسائل عادية
client.on('messageCreate', async message => {
  if (message.author.bot) return;
  
  if (message.content === '!ping') {
    await message.reply('Pong! 🏓');
  }
});

client.login(process.env.DISCORD_TOKEN);
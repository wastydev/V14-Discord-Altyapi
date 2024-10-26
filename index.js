require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

// Komutları yükle
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commands = new Map();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Bot başarıyla çalışıyor!');
});

client.on('messageCreate', (message) => {
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands.get(commandName);
    if (command) {
        command.execute(message);
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);
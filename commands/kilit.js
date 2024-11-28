const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'kilit',
    description: 'Ses kanalını kilitler veya belirtilen metin kanalını yazışmaya kapatır/açar',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply('Bu komutu kullanmak için yeterli yetkiye sahip değilsiniz.');
        }

        if (args.length === 0) {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                return message.reply('Ses kanalında değilsiniz.');
            }

            try {
                await voiceChannel.permissionOverwrites.edit(message.guild.roles.everyone, {
                    Connect: false
                });
                message.channel.send(`Ses kanalı ${voiceChannel.name} kilitlendi.`);
            } catch (error) {
                console.error(error);
                message.channel.send('Ses kanalını kilitlerken bir hata oluştu.');
            }
        } else {
            const channel = message.mentions.channels.first();
            if (!channel || channel.type !== 'GUILD_TEXT') {
                return message.reply('Geçerli bir metin kanalı belirtmelisiniz.');
            }

            const permissions = channel.permissionOverwrites.cache.get(message.guild.roles.everyone.id);
            const isLocked = permissions ? permissions.deny.has(PermissionsBitField.Flags.SendMessages) : false;

            try {
                await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                    SendMessages: !isLocked
                });
                message.channel.send(`${channel.name} kanalı ${isLocked ? 'yazışmaya açıldı' : 'yazışmaya kapatıldı'}.`);
            } catch (error) {
                console.error(error);
                message.channel.send('Kanalın yazışma izinlerini değiştirirken bir hata oluştu.');
            }
        }
    }
};

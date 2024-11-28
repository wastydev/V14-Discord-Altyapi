const { PermissionsBitField } = require('discord.js');

let snipedMessage = null;

module.exports = {
    name: 'snipe',
    description: 'Son silinen mesajı gösterir',
    execute(message, args) {
        const hasPermission = message.member.permissions.has(PermissionsBitField.Flags.ManageMessages);
        if (!hasPermission && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('Bu komutu kullanmak için yeterli yetkiye sahip değilsiniz.');
        }

        if (!snipedMessage) {
            return message.channel.send('Son silinen mesaj bulunamadı.');
        }

        const { content, author, createdAt } = snipedMessage;
        const time = createdAt.toLocaleTimeString('tr-TR');
        const embed = {
            color: 0x0099ff,
            author: {
                name: author.tag,
                icon_url: author.displayAvatarURL({ dynamic: true }),
            },
            description: content,
            footer: {
                text: `Silinme zamanı: ${time}`
            }
        };

        message.channel.send({ embeds: [embed] });
    },
    setSnipedMessage(message) {
        snipedMessage = {
            content: message.content,
            author: message.author,
            createdAt: message.createdAt
        };
    }
};

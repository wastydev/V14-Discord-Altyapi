const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Belirtilen sayıda mesajı siler',
    async execute(message, args) {
        // Komutu kullanmak için gerekli yetkileri kontrol et
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('Bu komutu kullanmak için yeterli yetkiye sahip değilsiniz.');
        }

        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount <= 0) {
            return message.reply('Lütfen silinecek geçerli bir mesaj sayısı girin.');
        }

        // En fazla 100 mesaj silebilirsiniz
        const deleteCount = Math.min(amount, 100);

        try {
            await message.channel.bulkDelete(deleteCount, true);
            message.channel.send(`Başarıyla ${deleteCount} mesaj silindi.`).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        } catch (error) {
            console.error(error);
            message.reply('Mesajları silerken bir hata oluştu.');
        }
    }
};

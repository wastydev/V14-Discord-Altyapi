const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'kayitsiz',
    description: 'Belirtilen kullanıcının tüm rollerini alır ve belirli bir rol verir',
    async execute(message, args) {
        // Komutu kullanmak için gerekli yetkileri kontrol et
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('Bu komutu kullanmak için yeterli yetkiye sahip değilsiniz.');
        }

        // Kullanıcı ve rol etiketlerini al
        const user = message.mentions.members.first();
        const roleId = 'ROLE_ID'; // Verilecek rolün ID'si

        if (!user) {
            return message.reply('Lütfen rollerini alacağınız kullanıcıyı etiketleyin.');
        }

        const role = message.guild.roles.cache.get(roleId);
        if (!role) {
            return message.reply('Belirtilen rol bulunamadı.');
        }

        try {
            // Kullanıcının tüm rollerini kaldır
            const rolesToRemove = user.roles.cache.filter(r => r.id !== message.guild.id);
            await user.roles.remove(rolesToRemove);

            // Belirtilen rolü ver
            await user.roles.add(role);

            message.channel.send(`${user} kullanıcısının tüm rolleri alındı ve ${role.name} rolü verildi.`);
        } catch (error) {
            console.error(error);
            message.reply('Rolleri yönetirken bir hata oluştu.');
        }
    }
};

module.exports = {
    name: 'vip',
    description: 'Etiketlenen kullanıcıya VIP rolü verir.',
    async execute(message) {
        // Kullanıcının yeterli yetkiye sahip olup olmadığını kontrol et
        if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('BAN_MEMBERS')) {
            return message.channel.send('Bu komutu kullanmak için yeterli yetkiniz yok.');
        }

        // Etiketlenen kullanıcıyı al
        const member = message.mentions.members.first();
        const role = message.guild.roles.cache.find(role => role.name === 'VIP');

        // Eğer etiketlenen kullanıcı yoksa veya rol yoksa
        if (!member) {
            return message.channel.send('Lütfen bir kullanıcı etiketleyin.');
        }

        if (!role) {
            return message.channel.send('VIP rolü bulunamadı.');
        }

        // Rolü ver
        try {
            await member.roles.add(role);
            message.channel.send(`${member} kullanıcısına VIP rolü verildi.`);
        } catch (error) {
            console.error(error);
            message.channel.send('Rol verilirken bir hata oluştu.');
        }
    },
};
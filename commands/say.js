module.exports = {
    name: 'say',
    description: 'Sunucudaki toplam üye, aktif üye ve boost sayısını gösterir.',
    async execute(message) {
        // Kullanıcının yeterli yetkiye sahip olup olmadığını kontrol et
        if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('BAN_MEMBERS')) {
            return message.channel.send('Bu komutu kullanmak için yeterli yetkiniz yok.');
        }

        // Sunucu bilgilerini al
        const guild = message.guild;

        // Toplam üyeleri al
        const totalMembers = guild.memberCount;

        // Aktif üyeleri say (bot olmayan ve çevrimiçi olan)
        const activeMembers = guild.members.cache.filter(member => !member.user.bot && member.presence?.status === 'online').size;

        // Boost sayısını al
        const boostCount = guild.premiumSubscriptionCount || 0;

        // Sonucu mesaj olarak gönder
        message.channel.send(`Sunucudaki toplam üye: **${totalMembers}**\nAktif üyeler: **${activeMembers}**\nBoost sayısı: **${boostCount}**`);
    },
};
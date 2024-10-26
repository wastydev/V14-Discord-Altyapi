module.exports = {
    name: 'erkek',
    description: 'Kişiyi kayıt eder.',
    async execute(message, args) {
        // Kullanıcının yeterli yetkiye sahip olup olmadığını kontrol et
        if (!message.member.permissions.has('ADMINISTRATOR') && 
            !message.member.permissions.has('BAN_MEMBERS') &&
            !message.member.roles.cache.some(role => role.name === 'Yetkili')) { // 'Yetkili' yerine uygun rol adını yaz
            return message.channel.send('Bu komutu kullanmak için yeterli yetkiniz yok.');
        }

        // Etiketlenen kullanıcıyı al
        const member = message.mentions.members.first();
        const roleToRemove = message.guild.roles.cache.find(role => role.name === 'Eski Rol'); // 'Eski Rol' yerine kaldırılacak rol adını yaz
        const roleToAdd = message.guild.roles.cache.find(role => role.name === 'Erkek'); // 'Erkek' yerine verilecek rol adını yaz

        // Eğer etiketlenen kullanıcı yoksa veya roller yoksa
        if (!member) {
            return message.channel.send('Lütfen bir kullanıcı etiketleyin.');
        }

        if (!roleToRemove || !roleToAdd) {
            return message.channel.send('Gerekli roller bulunamadı.');
        }

        // Yeni ismi ayarla
        const newName = args.slice(1).join(' ');
        if (!newName) {
            return message.channel.send('Lütfen yeni bir isim belirtin.');
        }

        // Rolü al ve ver
        try {
            await member.roles.remove(roleToRemove);
            await member.roles.add(roleToAdd);
            const responseMessage = await message.channel.send(`${member} kullanıcısından ${roleToRemove.name} rolü alındı ve ${roleToAdd.name} rolü verildi.`);

            // Kullanıcının ismini değiştir
            await member.setNickname(newName);

            // Belirli bir kanala hoş geldin mesajı gönder
            const welcomeChannel = message.guild.channels.cache.find(channel => channel.name === 'hoş-geldin'); // 'hoş-geldin' yerine uygun kanal adını yaz
            if (welcomeChannel) {
                const welcomeMessage = await welcomeChannel.send(`${member}, aramıza hoş geldin!`);

                // 10 saniye sonra hoş geldin mesajını sil
                setTimeout(() => {
                    welcomeMessage.delete().catch(console.error);
                }, 10000); // 10000 ms = 10 saniye
            } else {
                message.channel.send('Hoş geldin mesajı gönderilecek kanal bulunamadı.');
            }
        } catch (error) {
            console.error(error);
            message.channel.send('Rollerle ilgili bir hata oluştu.');
        }
    },
};

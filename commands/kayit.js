const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'kayıt',
    description: 'Kullanıcı kaydı için cinsiyet seçimi yapar.',
    async execute(message, args) {
        const member = message.mentions.members.first();
        const isim = args.slice(2).join(' ');

        if (!member || !isim) {
            return message.reply('Geçersiz kullanım! Doğru kullanım: `!kayıt @etiket isim`');
        }

        // Kullanıcı adını değiştir
        await member.setNickname(isim);
        
        const buttonErkek = new ButtonBuilder()
            .setCustomId('erkek')
            .setLabel('Erkek')
            .setStyle(ButtonStyle.Primary);

        const buttonKadin = new ButtonBuilder()
            .setCustomId('kadin')
            .setLabel('Kadın')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(buttonErkek, buttonKadin);

        await message.reply({ content: `${member}, lütfen cinsiyetini seç:`, components: [row] });

        const filter = i => i.user.id === member.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async (interaction) => {
            if (interaction.customId === 'erkek') {
                const role = message.guild.roles.cache.find(r => r.name === 'Erkek');
                if (role) {
                    await member.roles.add(role);
                    await interaction.reply(`${isim} olarak "Erkek" rolü verildi!`);
                }
            } else if (interaction.customId === 'kadin') {
                const role = message.guild.roles.cache.find(r => r.name === 'Kadın');
                if (role) {
                    await member.roles.add(role);
                    await interaction.reply(`${isim} olarak "Kadın" rolü verildi!`);
                }
            }
            collector.stop();
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                message.channel.send(`${member}, zaman aşımına uğradın! Lütfen tekrar dene.`);
            }
        });
    },
};

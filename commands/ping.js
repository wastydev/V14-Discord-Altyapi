module.exports = {
    name: 'ping',
    description: 'Botun ping değerini gösterir.',
    async execute(message) {
        // Kullanıcının yeterli yetkiye sahip olup olmadığını kontrol et
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.channel.send('Bu komutu kullanmak için yeterli yetkiniz yok.');
        }

        const ping = message.client.ws.ping; // Botun ping değerini al
        message.channel.send(`Botun ping değeri: ${ping} ms`);
    },
};
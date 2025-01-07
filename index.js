require('dotenv').config();  // Đảm bảo dotenv được nạp

const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// Đảm bảo rằng token được lấy từ biến môi trường
console.log(process.env.DISCORD_TOKEN);  // Kiểm tra xem token có đúng không

client.once('ready', () => {
    console.log('Bot is online!');
    const guildId = '1272455431406747718'; // Thay thế bằng ID server của bạn
    const guild = client.guilds.cache.get(guildId);

    if (guild) {
        const command = new SlashCommandBuilder()
            .setName('link')
            .setDescription('Bypass một link')
            .addStringOption(option => option
                .setName('url')
                .setDescription('URL cần bypass')
                .setRequired(true));

        guild.commands.create(command)
            .then(() => {
                console.log('Lệnh slash đã được đăng ký');
            })
            .catch(console.error);
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    if (commandName === 'link') {
        const url = interaction.options.getString('url');
        const bypassUrl = `https://bypass.city/bypass?bypass=${encodeURIComponent(url)}`;
        await interaction.reply(bypassUrl);  // Gửi link bypass cho người dùng
    }
});

// Đảm bảo token được nạp từ biến môi trường
console.log(process.env.DISCORD_TOKEN);  // Kiểm tra token
client.login(process.env.DISCORD_TOKEN);  
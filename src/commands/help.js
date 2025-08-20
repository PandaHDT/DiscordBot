const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../../config.json');

module.exports = {
    name: 'help',
    description: 'Listet alle verfügbaren Commands und deren Beschreibung auf.',
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Listet alle verfügbaren Commands und deren Beschreibung auf.'),
    async execute(interaction) {
        const commandsPath = path.join(__dirname);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        let helpText = '';
        for (const file of commandFiles) {
            if (file === 'help.js') continue;
            const command = require(path.join(commandsPath, file));
            if (command.data && command.description) {
                helpText += `**/${command.data.name}**: ${command.description}\n`;
            } else if (command.name && command.description) {
                helpText += `**/${command.name}**: ${command.description}\n`;
            }
        }
        const embed = new EmbedBuilder()
            .setTitle('Hilfe - Verfügbare Commands')
            .setDescription(helpText || 'Keine Commands gefunden.')
            .setColor(config.embedColor || 0x5865F2)
            .setFooter({ text: config.footer || '' });
        await interaction.reply({ embeds: [embed] });
    }
};

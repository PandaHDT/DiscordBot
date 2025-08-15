
const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'setowner',
    description: 'Setzt die ownerID für den Bot. Nur für Administratoren.',
    data: new SlashCommandBuilder()
        .setName('setowner')
        .setDescription('Setzt die ownerID für den Bot. Nur für Administratoren.')
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('Die neue Owner-ID (Discord User ID)')
                .setRequired(true)),
    async execute(interaction) {
        const { ownerID } = require('../../config.json');
        if (!interaction.member.permissions.has('Administrator')) {
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('Fehler')
                    .setDescription('Nur Administratoren können diesen Command ausführen!')
                    .setColor(0x23272A)
                ],
                flags: 64
            });
            return;
        }
        const newOwnerId = interaction.options.getString('userid');
        if (!/^[0-9]{17,19}$/.test(newOwnerId)) {
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('Fehler')
                    .setDescription('Bitte gib eine gültige Discord UserID an (nur Zahlen, 17-19 Stellen)!')
                    .setColor(0x23272A)
                ],
                flags: 64
            });
            return;
        }
        const configPath = path.join(__dirname, '../../config.json');
        let config = require(configPath);
        config.ownerID = newOwnerId;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        await interaction.reply({
            embeds: [new EmbedBuilder()
                .setTitle('Owner gesetzt')
                .setDescription(`Die ownerID wurde auf ${newOwnerId} gesetzt und gespeichert.`)
                .setColor(0x23272A)
            ],
            flags: 64
        });
    }
};

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getAdminLevel } = require('../utils/permission');

module.exports = {
    name: 'adminlevel',
    description: 'Zeigt oder vergibt den Adminlevel eines Users.',
    data: new SlashCommandBuilder()
        .setName('adminlevel')
        .setDescription('Zeigt oder vergibt den Adminlevel eines Users.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Der User, dessen Adminlevel angezeigt oder gesetzt werden soll')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('Die UserID, deren Adminlevel angezeigt oder gesetzt werden soll')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('level')
                .setDescription('Setzt den Adminlevel (nur für Alpha)')
                .setRequired(false)
                .addChoices(
                    { name: 'Alpha', value: 'Alpha' },
                    { name: 'Bravo', value: 'Bravo' },
                    { name: 'Charlie', value: 'Charlie' },
                    { name: 'Delta', value: 'Delta' },
                    { name: 'Echo', value: 'Echo' }
                )
        ),
    async execute(interaction) {
        const { getAdminLevel, hasAdminLevel } = require('../utils/permission');
        const fs = require('fs');
        const path = require('path');
        const permissionsPath = path.join(__dirname, '../../permissions.json');
        let user = interaction.options.getUser('user');
        let userId = interaction.options.getString('userid');
    let levelToSet = interaction.options.getString('level');
        if (!user && !userId) user = interaction.user;
        const id = user ? user.id : userId;
        const { levels } = require('../utils/permission');
        // Abfrage: Jeder mit Echo darf abfragen
        if (!levelToSet) {
            if (!hasAdminLevel(interaction.user.id, 'Echo')) {
                await interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setTitle('Fehler')
                        .setDescription('Du benötigst mindestens Adminlevel Echo, um Adminlevel abzufragen.')
                        .setColor(0x23272A)
                    ],
                    flags: 64
                });
                return;
            }
            const level = getAdminLevel(id) || 'Kein Level';
            const embed = new EmbedBuilder()
                .setTitle('Adminlevel')
                .setDescription(`<@${id}> hat Adminlevel **${level}**`)
                .setColor(0x23272A);
            await interaction.reply({ embeds: [embed], flags: 64 });
            return;
        }
        // Setzen: Nur Alpha darf setzen
        if (!hasAdminLevel(interaction.user.id, 'Alpha')) {
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('Fehler')
                    .setDescription('Nur Adminlevel Alpha kann Adminlevel vergeben!')
                    .setColor(0x23272A)
                ],
                flags: 64
            });
            return;
        }
        if (id === interaction.user.id) {
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('Fehler')
                    .setDescription('Du kannst deinen eigenen Adminlevel nicht ändern!')
                    .setColor(0x23272A)
                ],
                flags: 64
            });
            return;
        }
        if (!levels.includes(levelToSet)) {
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('Fehler')
                    .setDescription('Adminlevel muss Alpha, Bravo, Charlie, Delta oder Echo sein!')
                    .setColor(0x23272A)
                ],
                flags: 64
            });
            return;
        }
        // Permissions.json aktualisieren
        let permissions = {};
        try {
            permissions = JSON.parse(fs.readFileSync(permissionsPath, 'utf8'));
        } catch (e) {}
        permissions[id] = levelToSet;
        fs.writeFileSync(permissionsPath, JSON.stringify(permissions, null, 2));
        const embed = new EmbedBuilder()
            .setTitle('Adminlevel gesetzt')
            .setDescription(`<@${id}> hat jetzt Adminlevel **${levelToSet}**`)
            .setColor(0x23272A);
        await interaction.reply({ embeds: [embed], flags: 64 });
    }
};

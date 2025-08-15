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
                .setDescription('Setzt den Adminlevel (nur für Alpha, Zahl 1-5 oder Name)')
                .setRequired(false)
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
        const levelMap = {
            '5': 'Alpha',
            '4': 'Bravo',
            '3': 'Charlie',
            '2': 'Delta',
            '1': 'Echo',
            'Alpha': 'Alpha',
            'Bravo': 'Bravo',
            'Charlie': 'Charlie',
            'Delta': 'Delta',
            'Echo': 'Echo'
        };
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
            const levelName = getAdminLevel(id) || 'Kein Level';
            let levelNumber = Object.entries(levelMap).find(([num, name]) => name === levelName && !isNaN(num));
            levelNumber = levelNumber ? levelNumber[0] : '-';
            const embed = new EmbedBuilder()
                .setTitle('Adminlevel')
                .setDescription(`<@${id}> hat Adminlevel **${levelNumber} - ${levelName}**`)
                .setColor(0x23272A);
            await interaction.reply({ embeds: [embed], flags: 64 });
            return;
        }
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
        let setLevelName = levelMap[levelToSet];
        if (!setLevelName) {
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('Fehler')
                    .setDescription('Adminlevel muss Alpha, Bravo, Charlie, Delta, Echo oder Zahl 1-5 sein!')
                    .setColor(0x23272A)
                ],
                flags: 64
            });
            return;
        }
        let permissions = {};
        try {
            permissions = JSON.parse(fs.readFileSync(permissionsPath, 'utf8'));
        } catch (e) {}
        permissions[id] = setLevelName;
        fs.writeFileSync(permissionsPath, JSON.stringify(permissions, null, 2));
        let setLevelNumber = Object.entries(levelMap).find(([num, name]) => name === setLevelName && !isNaN(num));
        setLevelNumber = setLevelNumber ? setLevelNumber[0] : '-';
        const embed = new EmbedBuilder()
            .setTitle('Adminlevel gesetzt')
            .setDescription(`<@${id}> hat jetzt Adminlevel **${setLevelNumber} - ${setLevelName}**`)
            .setColor(0x23272A);
        await interaction.reply({ embeds: [embed], flags: 64 });
    }
};

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { levels } = require('../utils/permission');
const config = require('../../config.json');

module.exports = {
    name: 'admins',
    description: 'Zeigt alle Admins und deren Level an.',
    data: new SlashCommandBuilder()
        .setName('admins')
        .setDescription('Zeigt alle Admins und deren Level an.'),
    async execute(interactionOrMessage) {
        const permissionsPath = require('path').join(__dirname, '../../permissions.json');
        const userdataPath = require('path').join(__dirname, '../../userdata.json');
        let permissions = {};
        let userdata = {};
        try {
            permissions = JSON.parse(fs.readFileSync(permissionsPath, 'utf8'));
        } catch (e) {}
        try {
            userdata = JSON.parse(fs.readFileSync(userdataPath, 'utf8'));
        } catch (e) {}
        const sorted = Object.entries(permissions).sort((a, b) => {
            return levels.indexOf(a[1]) - levels.indexOf(b[1]);
        });
        if (interactionOrMessage.isCommand && interactionOrMessage.isCommand()) {
            let desc = '';
            for (const [userId, level] of sorted) {
                let since = '-';
                if (userdata[userId]) {
                    since = `<t:${userdata[userId]}>`;
                }
                const user = await interactionOrMessage.guild.members.fetch(userId).catch(() => null);
                const username = user ? user.user.tag : 'Unbekannt';
                desc += `**LVL:** ${level.toUpperCase()}   **seit:** ${since}\n**UserID:** ${userId}   **User:** <@${userId}>\n\n`;
            }
            const embed = new EmbedBuilder()
                .setTitle('Admins Übersicht')
                .setDescription(desc)
                .setColor(config.embedColor || '')
                .setFooter({ text: config.footer || '' });
            await interactionOrMessage.reply({ embeds: [embed] });
        }
    }
};

const fs = require('fs');
const path = require('path');

const permissionsPath = path.join(__dirname, '../../permissions.json');
const userdataPath = path.join(__dirname, '../../userdata.json');

function getAdminsData() {
    let permissions = {};
    let userdata = {};
    try {
        permissions = JSON.parse(fs.readFileSync(permissionsPath, 'utf8'));
    } catch (e) {}
    try {
        userdata = JSON.parse(fs.readFileSync(userdataPath, 'utf8'));
    } catch (e) {}
    return Object.entries(permissions)
        .filter(([_, level]) => level)
        .map(([userId, level]) => {
            return {
                userId,
                level,
                since: userdata[userId] ? new Date(userdata[userId] * 1000).toLocaleDateString('de-DE') : 'Unbekannt'
            };
        });
}

function formatAdminsMarkdown(admins, client) {
    let rows = admins.map(admin => {
        const user = client.users.cache.get(admin.userId);
        const username = user ? `${user.username}#${user.discriminator}` : 'Unbekannt';
        return `| <@${admin.userId}> | ${admin.userId} | ${username} | ${admin.level} | ${admin.since} |`;
    });
    return [
        '| User | UserID | Name | Level | Seit |',
        '|------|--------|------|-------|------|',
        ...rows
    ].join('\n');
}

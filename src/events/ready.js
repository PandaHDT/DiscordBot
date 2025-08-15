module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Bot ist online als ${client.user.tag}`);
        client.user.setPresence({
            activities: [{ name: '👨‍💻 am Entwickeln', type: 4 }],
            status: 'dnd'
        });

        const { REST, Routes, Collection } = require('discord.js');
        const fs = require('fs');
        const path = require('path');
        const TEST_GUILD_ID = '1262103703905898557';

        client.commands = new Collection();
        const commandsPath = path.join(__dirname, '..', 'commands');
        const commandFiles = fs.existsSync(commandsPath) ? fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')) : [];
        const slashCommands = [];
        for (const file of commandFiles) {
            const command = require(path.join(commandsPath, file));
            client.commands.set(command.name, command);
            if (command.data) {
                slashCommands.push(command.data.toJSON());
            }
        }

        // Slash Commands auf Test-Guild registrieren
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
        try {
            await rest.put(
                Routes.applicationGuildCommands(client.user.id, TEST_GUILD_ID),
                { body: slashCommands }
            );
            console.log('Slash Commands erfolgreich registriert!');
        } catch (error) {
            console.error('Fehler beim Registrieren der Slash Commands:', error);
        }
    },
};

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ content: 'Fehler beim Ausführen des Befehls!', flags: 64});
            }
        }
    }
};

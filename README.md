# DiscordBot

## Wichtige Dateien: config.json & permissions.json

Erstelle im Hauptverzeichnis die Datei `config.json` mit folgendem Inhalt:

```json
{
   "prefix": "!",
   "ownerID": "DEINE_DISCORD_USERID"
}
```

Erstelle im Hauptverzeichnis die Datei `permissions.json` mit folgendem Inhalt:

```json
{
   "DEINE_DISCORD_USERID": 5
}
```

Ersetze `DEINE_DISCORD_USERID` durch deine eigene Discord UserID. Die ownerID ist automatisch Adminlevel 5.

**Hinweis:** Diese Dateien dürfen nicht ins GitHub-Repo, da sie "sensible" Daten enthalten!

## Features
- WIK 
## Installation
1. **Repository klonen:**
   ```powershell
   git clone https://github.com/PandaHDT/DiscordBot.git
   ```
2. **Abhängigkeiten installieren:**
   ```powershell
   cd DiscordBot
   npm install
   ```
3. **Bot konfigurieren:**
   - Erstelle eine `.env` Datei und trage deinen Discord Bot Token ein:
     ```env
     DISCORD_TOKEN=dein_token
     ```
4. **Bot starten:**
   ```powershell
   npm start
   ```

## Nutzung
- WIP

## Schluss
Ich bin kein Profi... Jedoch probiere ich vieles aus!

---
Viel Spaß mit deinem Discord Bot! 🎉

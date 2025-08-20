# DiscordBot

## Wichtige Dateien: permissions.json & userdata.json

Alle Admin- und Userdaten werden in `permissions.json` und `userdata.json` gespeichert.

Erstelle im Hauptverzeichnis die Datei `permissions.json` mit folgendem Inhalt:

```json
{
   "DEINE_DISCORD_USERID": "Alpha",
   "ANDERE_USERID": "Bravo"
}
```

Erstelle im Hauptverzeichnis die Datei `userdata.json` mit folgendem Inhalt:

```json
{
   "DEINE_DISCORD_USERID": 1692124800,
   "ANDERE_USERID": 1692124800
}
```

Ersetze die UserIDs durch die gewünschten Discord UserIDs. Das Adminlevel reicht von **ALPHA** (höchstes) bis **ECHO** (niedrigstes). Das Datum ist ein Unix-Timestamp und gibt an, seit wann der User Admin ist.

**Hinweis:** Diese Dateien dürfen nicht ins GitHub-Repo, da sie "sensible" Daten enthalten!

## Features
- WIP

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

## Hinweis zur Entwicklung

**Diese Version des Bots wird nicht weiterentwickelt und dient nur als Anfangsbuild für einen richtigen Bot.**  
Sie ist als öffentliche, experimentelle Basis gedacht und wird nicht mit neuen Features oder Updates versorgt.

## Schluss
Ich bin kein Profi... Jedoch probiere ich vieles aus!

---
Viel Spaß mit deinem Discord Bot! 🎉

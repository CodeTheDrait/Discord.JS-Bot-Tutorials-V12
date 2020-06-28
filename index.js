const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.once('ready', () => {
    console.log('Tutorial Bot is online!');
});

client.commands = new Discord.Collection()
const fs = require("fs")
fs.readdir("./commands/", (error, files) => {
    files = files.filter(f => f.endsWith(".js"))
    files.forEach(f => {
        const command = require(`./commands/${f}`)
        client.commands.set(command.name, command)
        console.log(`Command ${command.name} was loaded!`)
    });
});

client.on("message", message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).split(" ")
    const command = args.shift()
    const cmd = client.commands.get(command)
    if (cmd) {
        cmd.run(client, message, args)
    } else return;
});

client.login(config.token);

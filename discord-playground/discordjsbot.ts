// @ts-nocheck
// discord.js playground

import discord from "discord.js"
import dotenv from "dotenv"
import { analyseSentiment } from "./sentiment"
dotenv.config();

const bot = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES"] });

bot.on('messageCreate', async (msg) => {
    return; // free first 500 calls in month
    const content = msg.content
    console.log(`bot received ${content}`)

    if (!msg.author.bot) {
        const { score } = await analyseSentiment(content)
        msg.channel.send(`I heard you "${content} ${score} ${score > 0 ? "POSITIVE" : "NEGATIVE"}`)
    }
})

bot.on('presenceUpdate', (oldPresence, newPresence) => {
    const { status, clientStatus, userId, member  } = newPresence;
    const msg = `user${userId} new status: ${status}, clientStatus: ${JSON.stringify(clientStatus, null, 2)}}`;
    console.log(msg);
    // channel.send(msg);
});

bot.on('interactionCreate', async (interaction) => {
    console.log("interactionCreate")
});

bot.on('ready', () => {
    console.log("bot is ready")
})

console.log("connecting bot")
bot.login(process.env.DISCORD_TOKEN)
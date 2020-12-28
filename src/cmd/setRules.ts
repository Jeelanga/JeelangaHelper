import { Message, TextChannel } from "discord.js";
import messages from "../messages.json";
import { bot } from "../app";

export async function setRules(message: Message){
    await message.delete().catch(err => console.error(err));
    if(message.author.id != process.env.OwnerID) return;
    
    const channel = bot.channels.cache.get(process.env.RulesChannel) as TextChannel;
    await channel.send(messages.description).catch(err => console.error(err));

    messages.rules.forEach(async list => {
        await channel.send(list).catch(err => console.error(err));
    });
}
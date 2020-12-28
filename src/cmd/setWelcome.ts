import { Message, TextChannel } from "discord.js";
import { bot } from "../app";
import messages from "../../messages.json";

export async function setWelcome(message: Message){
    await message.delete().catch(err => console.error(err));
    
    const channel = bot.channels.cache.get(process.env.WelcomeChannel) as TextChannel;
    await channel.send(messages.welcome).catch(err => console.error(err));
}
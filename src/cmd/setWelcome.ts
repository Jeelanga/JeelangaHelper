import { Message, TextChannel } from "discord.js";
import { bot } from "../app";

export async function setWelcome(message: Message){
    await message.delete();
    const header = "Добро пожаловать на сервер **Jeelanga**!\n\nНа данный момент бот в разработке, поэтому описание будет предоставлено позже <:waifu_angru:791307126986506310>";
    
    const channel = bot.channels.cache.get(process.env.WelcomeChannel) as TextChannel;
    await channel.send(header);
}
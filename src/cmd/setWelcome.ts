import { Message, TextChannel } from "discord.js";
import { bot } from "../app";
import messages from "../../messages.json";
import { envConf } from "../settings";

export async function setWelcome(message: Message) {
    await message.delete().catch((err: any) => console.error(err));
    if (message.author.id != envConf.OwnerID) return;

    const channel = bot.channels.cache.get(
        envConf.WelcomeChannel
    ) as TextChannel;
    await channel
        .send(messages.welcome)
        .catch((err: any) => console.error(err));
}

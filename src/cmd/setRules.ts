import { Message, TextChannel } from "discord.js";
import messages from "../../messages.json";
import { bot } from "../app";
import { envConf } from "../settings";

export async function setRules(message: Message) {
    await message.delete().catch((err: any) => console.error(err));
    if (message.author.id != envConf.OwnerID) return;

    const channel = bot.channels.cache.get(envConf.RulesChannel) as TextChannel;
    await channel
        .send(messages.description)
        .catch((err: any) => console.error(err));

    messages.rules.forEach(async (list: any) => {
        await channel.send(list).catch((err: any) => console.error(err));
    });
}

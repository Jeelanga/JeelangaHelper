import { Message } from "discord.js";
import { bot } from "../app";
import { envConf } from "../settings";

export async function closeTicket(message: Message | any) {
    await message.delete().catch((err: any) => console.error(err));

    if (
        message.author.id != envConf.OwnerID ||
        message.channel.parentID != envConf.TicketCategory
    )
        return;

    const channel = bot.channels.cache.get(message.channel.id);
    await channel.delete();
}

import { Message, MessageEmbed, TextChannel } from "discord.js";
import { bot, lang } from "../app";
import { envConf } from "../settings";

export async function setTicket(message: Message) {
    await message.delete().catch((err: any) => console.error(err));
    if (message.author.id != envConf.OwnerID) return;

    const guild = bot.guilds.cache.get(message.guild.id);

    const TicketSetup = new MessageEmbed()
        .setTimestamp()
        .setThumbnail(guild.iconURL({ size: 4096, dynamic: true }))
        .setColor(envConf.EmbedGreen)
        .setTitle(`${bot.user.username} » ${lang.ticket.title}`)
        .setDescription(lang.ticket.create)
        .setFooter(
            lang.helpMenu.name,
            guild.iconURL({ size: 4096, dynamic: true })
        );

    const channel = bot.channels.cache.get(
        envConf.SupportChannel
    ) as TextChannel;
    await (await channel.send({ embed: TicketSetup }))
        .react(envConf.CreateReaction)
        .catch((err: any) => console.error(err));
}

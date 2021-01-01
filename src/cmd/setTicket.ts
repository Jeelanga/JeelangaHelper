import { Message, MessageEmbed, TextChannel } from "discord.js";
import { bot, lang } from "../app";

export async function setTicket(message: Message){
    await message.delete().catch(err => console.error(err));
    if(message.author.id != process.env.OwnerID) return;

    const guild = bot.guilds.cache.get(message.guild.id);

    const TicketSetup = new MessageEmbed()
        .setTimestamp()
        .setThumbnail(guild.iconURL({ "size": 4096, "dynamic": true }))
        .setColor(process.env.EmbedGreen)
        .setTitle(`${bot.user.username} » ${lang.ticket.title}`)
        .setDescription(lang.ticket.create)
        .setFooter(lang.helpMenu.name, guild.iconURL({ size: 4096, dynamic: true }));

    const channel = bot.channels.cache.get(process.env.SupportChannel) as TextChannel;
    await (await channel.send({ "embed": TicketSetup })).react(process.env.CreateReaction).catch(err => console.error(err));
}
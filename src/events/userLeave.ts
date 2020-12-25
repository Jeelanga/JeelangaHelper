require("dotenv").config();

import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { bot } from "../app";

export async function memberRemove(member: GuildMember){
    const guild = bot.guilds.cache.get(member.guild.id);

    const OldMember = new MessageEmbed()
        .setColor(process.env.EmbedRed)
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL({ size: 4096, dynamic: true }))
        .setTitle(`${bot.user.username} » ${member.user.username} (${member.user.id})`)
        .setFooter(`Member leave from server`, guild.iconURL({ size: 4096, dynamic: true }));

    const channel = bot.channels.cache.get(process.env.AdminChannel) as TextChannel;
    await channel.send(OldMember);
}
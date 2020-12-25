require("dotenv").config();

import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { bot } from "../app";

export async function memberAdd(member: GuildMember){
    const guild = bot.guilds.cache.get(member.guild.id);

    const NewMember = new MessageEmbed()
        .setColor(process.env.EmbedGreen)
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL({ size: 4096, dynamic: true }))
        .setTitle(`${bot.user.username} » ${member.user.username} (${member.user.id})`)
        .setFooter(`Member join to server`, guild.iconURL({ size: 4096, dynamic: true }));

    const channel = bot.channels.cache.get(process.env.AdminChannel) as TextChannel;
    await channel.send(NewMember);
}
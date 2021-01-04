import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { bot, lang } from "../app";
import { envConf } from "../settings";

export async function memberAdd(member: GuildMember) {
    const guild = bot.guilds.cache.get(member.guild.id);

    const NewMember = new MessageEmbed()
        .setColor(envConf.EmbedGreen)
        .setTimestamp()
        .setThumbnail(
            member.user.displayAvatarURL({ size: 4096, dynamic: true })
        )
        .setTitle(
            `${bot.user.username} » ${member.user.username} (${member.user.id})`
        )
        .setFooter(
            lang.member.join,
            guild.iconURL({ size: 4096, dynamic: true })
        );

    const channel = bot.channels.cache.get(envConf.AdminChannel) as TextChannel;
    await channel.send(NewMember).catch((err: any) => console.error(err));
}

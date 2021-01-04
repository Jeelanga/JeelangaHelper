import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { bot, lang } from "../app";
import { envConf } from "../settings";

export async function memberRemove(member: GuildMember) {
    const guild = bot.guilds.cache.get(member.guild.id);

    const OldMember = new MessageEmbed()
        .setColor(envConf.EmbedRed)
        .setTimestamp()
        .setThumbnail(
            member.user.displayAvatarURL({ size: 4096, dynamic: true })
        )
        .setTitle(
            `${bot.user.username} » ${member.user.username} (${member.user.id})`
        )
        .setFooter(
            lang.member.leave,
            guild.iconURL({ size: 4096, dynamic: true })
        );

    const channel = bot.channels.cache.get(envConf.AdminChannel) as TextChannel;
    await channel.send(OldMember).catch((err: any) => console.error(err));
}

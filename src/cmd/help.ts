import { Message, MessageEmbed } from "discord.js";
import { bot, lang } from "../app";
import time from "humanize-duration";
import { envConf } from "../settings";

export async function helpCMD(message: Message) {
    await message.delete().catch((err: any) => console.error(err));
    if (message.author.id != envConf.OwnerID) return;

    const guild = bot.guilds.cache.get(message.guild.id);

    const HelpEmbed = new MessageEmbed()
        .setTimestamp()
        .setThumbnail(guild.iconURL({ size: 4096, dynamic: true }))
        .setColor(envConf.EmbedGreen)
        .setTitle(`${bot.user.username} » ${lang.helpMenu.name}`)
        .addFields(
            {
                name: lang.helpMenu.helpCMD[0],
                value: lang.helpMenu.helpCMD[1],
                inline: true,
            },
            {
                name: lang.helpMenu.welcomeCMD[0],
                value: lang.helpMenu.welcomeCMD[1],
                inline: true,
            },
            {
                name: lang.helpMenu.rulesCMD[0],
                value: lang.helpMenu.rulesCMD[1],
                inline: true,
            },
            {
                name: lang.helpMenu.ticketCMD[0],
                value: lang.helpMenu.ticketCMD[1],
                inline: true,
            },
            {
                name: lang.helpMenu.kickCMD[0],
                value: lang.helpMenu.kickCMD[1],
                inline: true,
            },
            {
                name: lang.helpMenu.banCMD[0],
                value: lang.helpMenu.banCMD[1],
                inline: true,
            },
            {
                name: lang.helpMenu.editCMD[0],
                value: lang.helpMenu.editCMD[1],
                inline: true,
            },
            { name: lang.helpMenu.ping, value: bot.ws.ping, inline: true },
            {
                name: lang.helpMenu.users,
                value: bot.users.cache.size,
                inline: true,
            },
            {
                name: lang.helpMenu.uptime,
                value: time(bot.uptime, {
                    language: envConf.Language,
                    round: true,
                }),
                inline: true,
            }
        )
        .setFooter(
            lang.helpMenu.name,
            guild.iconURL({ size: 4096, dynamic: true })
        );

    const output = await message.channel.send({ embed: HelpEmbed });
    await output
        .delete({ timeout: 60000 })
        .catch((err: any) => console.error(err));
}

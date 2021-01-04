import {
    MessageEmbed,
    MessageReaction,
    PartialUser,
    TextChannel,
} from "discord.js";
import { bot, lang } from "../app";
import { envConf } from "../settings";

export async function memberReact(
    reaction: MessageReaction,
    user: PartialUser
) {
    if (reaction.me) return;

    const guild = bot.guilds.cache.get(reaction.message.guild.id);
    const member = guild.members.cache.get(user.id);
    const ticketName = member.roles.cache.has(envConf.PremiumRole)
        ? `premium-${user.id}`
        : `default-${user.id}`;

    if (
        reaction.message.channel.id == envConf.SupportChannel &&
        reaction.emoji.name == envConf.CreateReaction
    ) {
        if (bot.channels.cache.find((x: TextChannel) => x.name == ticketName)) {
            const channel = bot.channels.cache.find(
                (x: TextChannel) => x.name == ticketName
            ) as TextChannel;
            await channel
                .send(`${member}, ${lang.ticket.alreadyExist}`)
                .catch((err: any) => console.error(err));

            return;
        }

        const userTicket = await guild.channels.create(ticketName, {
            type: "text",
            topic: lang.ticket.topic,
            nsfw: false,
            parent: envConf.TicketCategory,
            position: 0,
        });

        await userTicket
            .lockPermissions()
            .catch((err: any) => console.error(err));
        await userTicket
            .updateOverwrite(user.id, {
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: false,
                MANAGE_ROLES: false,
                MANAGE_WEBHOOKS: false,
                CREATE_INSTANT_INVITE: false,
                SEND_MESSAGES: true,
                EMBED_LINKS: true,
                ATTACH_FILES: true,
                ADD_REACTIONS: false,
                USE_EXTERNAL_EMOJIS: false,
                MENTION_EVERYONE: false,
                MANAGE_MESSAGES: false,
                READ_MESSAGE_HISTORY: true,
                SEND_TTS_MESSAGES: false,
            })
            .catch((err: any) => console.error(err));

        const channel = bot.channels.cache.find(
            (x: TextChannel) => x.name == ticketName
        ) as TextChannel;

        const CloseTicket = new MessageEmbed()
            .setColor(envConf.EmbedGreen)
            .setTimestamp()
            .setThumbnail(guild.iconURL({ dynamic: true, size: 4096 }))
            .setDescription(lang.ticket.userDescription)
            .setFooter(
                lang.ticket.ticketSystem,
                member.user.displayAvatarURL({ dynamic: true, size: 4096 })
            );

        await (await channel.send({ embed: CloseTicket }))
            .react(envConf.DeleteReaction)
            .catch((err: any) => console.error(err));
    }

    if (reaction.emoji.name == envConf.DeleteReaction) {
        const channel = bot.channels.cache.find(
            (x: TextChannel) => x.name == ticketName
        ) as TextChannel;
        if (!channel) return;

        if (
            reaction.message.channel.id ==
            bot.channels.cache.find((x: TextChannel) => x.name == ticketName).id
        ) {
            const channel = bot.channels.cache.find(
                (x: TextChannel) => x.name == ticketName
            );
            await channel.delete().catch((err: any) => console.error(err));
        }
    }
}

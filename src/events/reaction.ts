require("dotenv").config();

import { MessageEmbed, MessageReaction, PartialUser, TextChannel } from "discord.js";
import { bot, lang } from "../app";

export async function memberReact(reaction: MessageReaction, user: PartialUser){
    const guild = bot.guilds.cache.get(reaction.message.guild.id);
    const member = guild.members.cache.get(user.id);
    const ticketName = member.roles.cache.has(process.env.PremiumRole) ? `premium-${user.id}` : `default-${user.id}`;

    if(reaction.message.channel.id == process.env.SupportChannel && reaction.emoji.name == process.env.CreateReaction){
        if(bot.channels.cache.find((x: TextChannel) => x.name == ticketName)){
            const channel = bot.channels.cache.get(bot.channels.cache.find((x: TextChannel) => x.name == ticketName).id) as TextChannel;
            await channel.send(`${member}, ${lang.ticket.alreadyExist}`);
        
            return;
        }
    
        guild.channels.create(ticketName, {
            "type": "text",
            "topic": lang.ticket.topic,
            "nsfw": false,
            "parent": process.env.TicketCategory,
            "position": 0
        }).then(async ch => {
            await ch.lockPermissions();
            await ch.updateOverwrite(user.id, {
                "VIEW_CHANNEL": true,
                "MANAGE_CHANNELS": false,
                "MANAGE_ROLES": false,
                "MANAGE_WEBHOOKS": false,
                "CREATE_INSTANT_INVITE": false,
                "SEND_MESSAGES": true,
                "EMBED_LINKS": true,
                "ATTACH_FILES": true,
                "ADD_REACTIONS": false,
                "USE_EXTERNAL_EMOJIS": false,
                "MENTION_EVERYONE": false,
                "MANAGE_MESSAGES": false,
                "READ_MESSAGE_HISTORY": true,
                "SEND_TTS_MESSAGES": false
            });
        }).then(async () => {
            const channel = bot.channels.cache.get(bot.channels.cache.find((x: TextChannel) => x.name == ticketName).id) as TextChannel;
            const CloseTicket = new MessageEmbed()
                .setColor(process.env.EmbedGreen)
                .setTimestamp()
                .setThumbnail(guild.iconURL({ "dynamic": true, "size": 4096 }))
                .setDescription(lang.ticket.description)
                .setFooter(lang.ticket.ticketSystem, member.user.displayAvatarURL({ "dynamic": true, "size": 4096 }));
            
            await (await channel.send({ "embed": CloseTicket })).react(process.env.DeleteReaction);
        });
    }

    if(reaction.emoji.name == process.env.DeleteReaction){
        const channel = bot.channels.cache.find((x: TextChannel) => x.name == ticketName) as TextChannel;
        if(!channel) return;

        if(reaction.message.channel.id == bot.channels.cache.find((x: TextChannel) => x.name == ticketName).id){
            const channel = bot.channels.cache.get(bot.channels.cache.find((x: TextChannel) => x.name == ticketName).id);
            await channel.delete();
        }
    }
}
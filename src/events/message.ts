require("dotenv").config();

import { Message, MessageEmbed, TextChannel } from "discord.js";
import { bot, lang } from "../app";
import spamDetect from "@satont/spamnya";

export async function messageEvent(message: Message){
    if(message.author.bot || message.channel.type == "dm") return;
    if(message.channel.type == "news"){
        try{
            await message.react(process.env.ReactionUP);
            await message.react(process.env.ReactionDOWN);
        }catch{
            (err: any) => console.error(err);
        }
    }

    const guild = bot.guilds.cache.get(message.guild.id);
    spamDetect.log(message, 50);

    if(spamDetect.sameMessages(3, 60000)){
        await message.delete();
        
        const msg = await message.author.send(lang.spamMenu.spamMessage);
        await msg.delete({ "timeout": 30000 });
    }

    if(message.content.toLowerCase() == "help"){
        await message.delete();

        const HelpEmbed = new MessageEmbed()
            .setTimestamp()
            .setThumbnail(guild.iconURL({ "size": 4096, "dynamic": true }))
            .setColor(process.env.EmbedGreen)
            .setTitle(`${bot.user.username} » ${lang.helpMenu.name}`)
            .addFields(
                { name: `**set-welcome**`, value: lang.helpMenu.cmd[0], inline: true },
                { name: `**set-ticket**`, value: lang.helpMenu.cmd[1], inline: true },
                { name: lang.helpMenu.cmd[2], value: bot.ws.ping, inline: true }
            )
            .setFooter(lang.helpMenu.name, guild.iconURL({ size: 4096, dynamic: true }));

        const msg = await message.channel.send({ "embed": HelpEmbed });
        await msg.delete({ timeout: 60000 });
    }

    if(message.content.toLowerCase() == "set-welcome"){
        await message.delete();

        const WelcomeEmbed = new MessageEmbed()
            .setColor(process.env.EmbedGreen)
            .setTitle(guild.name)
            .setDescription(`Добро пожаловать, друг! Данный Discord-сервер является `)
            .addFields(
                { name: `Rules`, value: `<#>`, inline: true },
                { name: `News`, value: `<#>`, inline: true },
                { name: `Create ticket`, value: `<#>`, inline: true },
                { name: `\u200B`, value: `\u200B`, inline: true },
                { name: `Invite`, value: `discord.gg/AbFExRq`, inline: true },
                { name: `Developer`, value: `<@!432085389948485633>`, inline: true }
            )
            .setFooter(`We love all, bro!`, guild.iconURL({ size: 4096, dynamic: true }));

        const channel = bot.channels.cache.get(process.env.WelcomeChannel) as TextChannel;
        await channel.send({ "embed": WelcomeEmbed });
    }

        if(message.content.toLowerCase() == "set-ticket"){
            message.delete();

            const TicketEmbed = new MessageEmbed()
                .setColor(process.env.EmbedGreen)
                .setTitle(`**Create ticket**`)
                .setDescription(`When you click on it 📑, the bot creates a ticket channel where you can type your problem or question.`)
                .setFooter(`JeelangaHelper - Ticket`, guild.iconURL({size: 4096, dynamic: true}));

            const msg = bot.channels.cache.get(process.env.SupportChannel) as TextChannel;
            await (await msg.send({ "embed": TicketEmbed })).react("📑");
        }
}
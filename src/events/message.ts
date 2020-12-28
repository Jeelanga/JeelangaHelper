require("dotenv").config();

import spamnya from "@satont/spamnya";
import { caps, link } from "@satont/text-utils";
import { Message } from "discord.js";
import { helpCMD } from "../cmd/help";
import { setRules } from "../cmd/setRules";
import { setWelcome } from "../cmd/setWelcome";
import { setTicket } from "../cmd/setTicket";
import { kickMember } from "../cmd/kick";
import { banMember } from "../cmd/ban";
import { lang } from "../app";

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

    const messageArray = message.content.split(" ");
    const litter = messageArray[0].toLowerCase();

    if(litter == "help") return helpCMD(message);
    if(litter == "set-welcome") return setWelcome(message);
    if(litter == "set-rules") return setRules(message);
    if(litter == "set-ticket") return setTicket(message);
    if(litter == "kick") return kickMember(message);
    if(litter == "ban") return banMember(message);
    
    if(message.channel.parent.id == process.env.TicketCategory || message.channel.parent.id == "791732950248456213" ||
    message.channel.parent.id == "791732736297009163" || message.member.hasPermission("ADMINISTRATOR")) return;

    spamnya.log(message, 50);

    if(spamnya.sameMessages(3, 60000)){
        await message.delete().catch(err => console.error(err));

        const msg = await message.member.send(lang.member.spam);
        await msg.delete({ "timeout": 60000 });
    }

    if(caps.isCapsed(message.content, { "percentage": 50 })){
        await message.delete().catch(err => console.error(err));

        const msg = await message.member.send(lang.member.caps);
        await msg.delete({ "timeout": 60000 });
    }

    if(link.includes(message.content, { "withSpaces": true })){
        await message.delete().catch(err => console.error(err));

        const msg = await message.member.send(lang.member.link);
        await msg.delete({ "timeout": 60000 });
    }
}
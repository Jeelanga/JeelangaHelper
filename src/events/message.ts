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
import { editMessage } from "../cmd/edit";
import { envConf } from "../settings";
import { closeTicket } from "../cmd/close";
import { clearCommand } from "../cmd/clear";

export async function messageEvent(message: Message) {
    if (message.author.bot || message.channel.type == "dm") return;
    if (message.channel.type == "news") {
        try {
            await message.react(envConf.ReactionUP);
            await message.react(envConf.ReactionDOWN);
        } catch {
            (err: any) => console.error(err);
        }
    }

    const messageArray = message.content.split(" ");
    const litter = messageArray[0].toLowerCase();
    const prefix = envConf.Prefix;

    if (litter == `${prefix}help`) return helpCMD(message);
    if (litter == `${prefix}set-welcome`) return setWelcome(message);
    if (litter == `${prefix}set-rules`) return setRules(message);
    if (litter == `${prefix}set-ticket`) return setTicket(message);
    if (litter == `${prefix}kick`) return kickMember(message);
    if (litter == `${prefix}ban`) return banMember(message);
    if (litter == `${prefix}edit`) return editMessage(message);
    if (litter == `${prefix}close`) return closeTicket(message);
    if (litter == `${prefix}clear`) return clearCommand(message);

    if (
        message.channel.parent.id == envConf.TicketCategory ||
        message.channel.parent.id == "791732950248456213" ||
        message.channel.parent.id == "791732736297009163" ||
        message.member.hasPermission("ADMINISTRATOR")
    )
        return;

    spamnya.log(message, 50);

    if (spamnya.sameMessages(3, 60000)) {
        await message.delete().catch((err: any) => console.error(err));

        const content = lang.member.deleted.replace(
            "{{ reason }}",
            lang.moderation.reasons.spam
        );
        const msg = await message.member.send(content);
        await msg
            .delete({ timeout: 60000 })
            .catch((err: any) => console.error(err));

        return;
    }

    if (caps.isCapsed(message.content, { percentage: 50 })) {
        await message.delete().catch((err: any) => console.error(err));

        const content = lang.member.deleted.replace(
            "{{ reason }}",
            lang.moderation.reasons.caps
        );
        const msg = await message.member.send(content);
        await msg
            .delete({ timeout: 60000 })
            .catch((err: any) => console.error(err));

        return;
    }

    if (link.includes(message.content)) {
        await message.delete().catch((err: any) => console.error(err));

        const content = lang.member.deleted.replace(
            "{{ reason }}",
            lang.moderation.reasons.urls
        );
        const msg = await message.member.send(content);
        await msg
            .delete({ timeout: 60000 })
            .catch((err: any) => console.error(err));

        return;
    }
}

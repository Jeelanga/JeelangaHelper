import { Message } from "discord.js";
import { lang } from "../app";

export async function kickMember(message: Message){
    await message.delete().catch(err => console.error(err));
    
    const messageArray = message.content.split(" ");
    const args = messageArray.slice(1);
    
    if(!args[0]) return message.channel.send(lang.moderation.noUser)
        .then(msg => msg.delete({ "timeout": 60000 }))
        .catch(err => console.error(err));

    const user = message.mentions.users.first();
    const reason = args[1] ? args[1] : lang.moderation.noReason;
    const member = message.guild.member(user);

    if(member.hasPermission("ADMINISTRATOR")) return message.channel.send(lang.moderation.staff)
        .then(msg => msg.delete({ "timeout": 60000 }))
        .catch(err => console.error(err));

    await member.send(`${lang.moderation.kicked} **${reason}**`)
    .then(async () => {
        await member.kick();
    }).catch(err => console.error(err));
}
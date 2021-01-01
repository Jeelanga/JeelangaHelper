import { Message } from "discord.js";

export async function editMessage(message: Message){
    await message.delete().catch(err => console.error(err));
    if(message.author.id != process.env.OwnerID) return;

    const messageArray = message.content.split(" ");
    const args = messageArray.slice(1);

    const messageID = args[0];
    const messageContent = args.slice(1).join(" ");

    if(!messageID) return;

    const content = await message.channel.messages.fetch(messageID);
    await content.edit(messageContent).catch(err => console.error(err));
}
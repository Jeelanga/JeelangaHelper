import { Message } from "discord.js";
import { envConf } from "../settings";

export async function clearCommand(message: Message | any) {
    await message.delete().catch((err: any) => console.error(err));

    const args = message.content.split(" ");

    if (
        message.author.id != envConf.OwnerID ||
        isNaN(parseInt(args[1])) ||
        parseInt(args[1]) > 100 ||
        !args[1]
    )
        return;

    await message.channel
        .bulkDelete(args[0])
        .catch((err: any) => console.error(err));

    return;
}

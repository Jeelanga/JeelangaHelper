import { bot } from "../app";

export function readyEvent(){
    bot.user.setPresence({ "activity": { "name": `In stage development ⛅`, "type": "COMPETING" }, "status": "dnd" });

    console.log(`[!]: ${bot.user.username} ready!`);
}
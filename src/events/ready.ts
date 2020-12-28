import { bot } from "../app";

export function readyEvent(){
    console.log(`[!]: ${bot.user.username} ready!`);
}
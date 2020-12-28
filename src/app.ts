require("dotenv").config();

import "source-map-support";
import { Client } from "discord.js";
import { messageEvent } from "./events/message";
import { readyEvent } from "./events/ready";
import { memberAdd } from "./events/userJoin";
import { memberRemove } from "./events/userLeave";
import { memberReact } from "./events/reaction";

export const lang = require(`../localization/${process.env.language ? process.env.language : "ru"}.json`);
export const bot = new Client({
    "disableMentions": "none",
    "partials": [
        "CHANNEL", 
        "GUILD_MEMBER", 
        "MESSAGE", 
        "REACTION", 
        "USER"
    ]
});

bot.login(process.env.token);

bot.on("ready", readyEvent);
bot.on("guildMemberAdd", memberAdd);
bot.on("guildMemberRemove", memberRemove);
bot.on("message", messageEvent);
bot.on("messageReactionAdd", memberReact);
bot.on("error", err => console.error(err));
bot.on("warn", warn => console.warn(warn));

process.on("unhandledRejection", (err) => console.error(err));
process.on("uncaughtException", (err) => console.error(err));
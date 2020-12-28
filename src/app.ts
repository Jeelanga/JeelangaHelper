require("dotenv").config();

import "source-map-support";
import { Client } from "discord.js";
import { messageEvent } from "./events/message";
import { readyEvent } from "./events/ready";
import { memberAdd } from "./events/userJoin";
import { memberRemove } from "./events/userLeave";
import { memberReact } from "./events/reaction";

export const lang = require(`../localization/${process.env.language}.json`);
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

bot.on("ready", readyEvent);
bot.on("guildMemberAdd", memberAdd);
bot.on("guildMemberRemove", memberRemove);
bot.on("message", messageEvent);
bot.on("messageReactionAdd", memberReact);

bot.login(process.env.token);
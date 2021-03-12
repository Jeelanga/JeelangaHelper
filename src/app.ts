import "source-map-support";
import { Client } from "discord.js";
import { messageEvent } from "./events/message";
import { readyEvent } from "./events/ready";
import { memberAdd } from "./events/userJoin";
import { memberRemove } from "./events/userLeave";
import { memberReact } from "./events/reaction";
import { envConf } from "./settings";
import path from "path";

export const lang = require(`${path.resolve()}/localization/${
    envConf.Language
}.json`);
export const bot = new Client({
    disableMentions: "none",
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
});

bot.login(envConf.Token);

bot.on("ready", readyEvent);
bot.on("guildMemberAdd", memberAdd);
bot.on("guildMemberRemove", memberRemove);
bot.on("message", messageEvent);
bot.on("messageReactionAdd", memberReact);
bot.on("error", (err: any) => console.error(err));
bot.on("warn", (warn) => console.warn(warn));

process.on("unhandledRejection", (err: any) => console.error(err));
process.on("uncaughtException", (err: any) => console.error(err));

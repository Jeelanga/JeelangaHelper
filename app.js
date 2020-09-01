const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const Words = require("./words.json");
require("dotenv").config();
bot.login(process.env.token);

bot.on("ready", () => {
    bot.user.setActivity(`🔐 ${bot.users.cache.size} участников`, {type: "WATCHING"});
    console.log(`\nБот ${bot.user.username} запущен!\n`);
});

bot.on("guildMemberAdd", (member) => {
    const group = bot.guilds.cache.get(member.guild.id);

    const NewMember = new Discord.MessageEmbed()
        .setColor(process.env.EmbedGreen)
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL({size: 4096, dynamic: true}))
        .setTitle(`${bot.user.username} » ${member.user.username} (${member.user.id})`)
        .setFooter(`Участник присоединился`, group.iconURL({size: 4096, dynamic: true}));

    return bot.channels.cache.get(process.env.AdminChannel).send(NewMember);
});

bot.on("guildMemberRemove", (member) => {
    const group = bot.guilds.cache.get(member.guild.id);

    const OldMember = new Discord.MessageEmbed()
        .setColor(process.env.EmbedRed)
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL({size: 4096, dynamic: true}))
        .setTitle(`${bot.user.username} » ${member.user.username} (${member.user.id})`)
        .setFooter(`Участник вышел`, group.iconURL({size: 4096, dynamic: true}));

    return bot.channels.cache.get(process.env.AdminChannel).send(OldMember);
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(message.channel.type === "news"){
        message.react(process.env.ReactionUP);
        message.react(process.env.ReactionDOWN);
    }

    const group = bot.guilds.cache.get(message.guild.id);

    if(Words.wh_word.some(word => message.content.toLowerCase().includes(word))) return;
    if(Words.bad_word.some(word => message.content.toLowerCase().includes(word))){
        message.delete();

        const BadWord = new Discord.MessageEmbed()
            .setColor(process.env.EmbedRed)
            .setTimestamp()
            .setThumbnail(message.author.displayAvatarURL({size: 4096, dynamic: true}))
            .setTitle(`${bot.user.username} » Запрещённое слово!`)
            .setDescription(`${message.author}, использовать такие слова запрещено!`)
            .setFooter(`${bot.user.username}`, group.iconURL({size: 4096, dynamic: true}));

        return message.channel.send(BadWord).then(msg => msg.delete({timeout: 60000}));
    }

    if(message.author.id === process.env.OwnerID){
        if(message.content.toLowerCase() === "set-welcome"){
            message.delete();

            const WelcomeEmbed = new Discord.MessageEmbed()
                .setColor(process.env.EmbedGreen)
                .setTitle(`**Добро пожаловать на сервер ${group.name}!**`)
                .setDescription(`Здесь Вы можете получить поддержку от разработчика, задать свой вопрос, получить актуальную информацию по боту или просто приятно провести своё время! Ознакомьтесь с гидом ниже, чтобы не нарушать правила поведения в текстовых и голосовых каналах!`)
                .addField(`\u200B`, `\u200B`)
                .addField(`Основной канал:`, `__<#740560918613721103>__`, true)
                .addField(`Информационный:`, `__<#740566780170207373>__`, true)
                .addField(`Правила сервера:`, `__<#740561223103545394>__`, true)
                .addField(`Чат для общения:`, `__<#740561340195668049>__`, true)
                .addField(`Чат для команд:`, `__<#740561393018863697>__`, true)
                .addField(`Создать тикет:`, `__<#740561569318174810>__`, true)
                .addField(`\u200B`, `\u200B`)
                .addField(`Разработчик бота`, `__<@&740565086153736252>__`, true)
                .addField(`Premium участник`, `__<@&740565520566452234>__`, true)
                .addField(`Помощник`, `__<@&742360835996909589>__`, true)
                .addField(`\u200B`, `\u200B`)
                .addField(`**Приглашение:**`, `__discord.gg/AbFExRq__`, true)
                .addField(`**Сайт:**`, `__https://jeelanga.net/__`, true)
                .addField(`**Разработчик:**`, `__<@!432085389948485633>__`, true)
                .addField(`\u200B`, `\u200B`)
                .setImage(`https://media.discordapp.net/attachments/634048309568208907/742374141075652738/kiss_136.gif`);

            return bot.channels.cache.get(process.env.WelcomeChannel).send(WelcomeEmbed);
        }

        if(message.content.toLowerCase() === "set-ticket"){
            message.delete();

            const TicketEmbed = new Discord.MessageEmbed()
                .setColor(process.env.EmbedGreen)
                .setTitle(`**Создание тикета для связи с поддержкой**`)
                .setDescription(`Нажав на реакцию - Вы создатите приватный канал, в котором сможете получить помощь от разработчика!`)
                .setFooter(`Jeelanga поддержка`, group.iconURL({size: 4096, dynamic: true}));

            return bot.channels.cache.get(process.env.SupportChannel).send(TicketEmbed)
                .then(msg => {
                    msg.react("📑");
                });
        }

        if(message.content.toLowerCase() === "set-rules"){
            message.delete();

            const RulesEmbed = new Discord.MessageEmbed()
                .setColor(process.env.EmbedGreen)
                .setTitle(`**Правила Discord-сервера**`)
                .setDescription(`
                **1:** Запрещено оскорблять участников Discord-сервера в любом виде.\n
                **2:** Запрещено использовать нецензурную брань.\n
                **3:** Запрещена публикация NSFW контента.\n
                **4:** Запрещена провокация к созданию флуда.\n
                **5:** Запрещено делать рассылку в ЛС участникам.\n
                **6:** Запрещено делать распродажу чего-либо.\n
                **7:** Запрещены аватарки с порно, порнографические ники и нечитаемые ники.\n
                **8:** Запрещено выдавать себя за разработчика.\n
                \n
                **НЕ ПРИКРЫВАЙТЕСЬ ИЗЪЯНАМИ ПРАВИЛ!**
                `)
                .setImage(`https://media.discordapp.net/attachments/634048309568208907/742493229844529244/TatteredSecondaryBlackbear-size_restricted.gif`);

            return bot.channels.cache.get(process.env.RulesChannel).send(RulesEmbed);
        }
    }
});

const events = {
    MESSAGE_REACTION_ADD: "messageReactionAdd",
    MESSAGE_REACTION_REMOVE: "messageReactionRemove"
}

bot.on("raw", async event => {
    if(!events.hasOwnProperty(event.t)) return;

    const { d: data } = event;
    const user = bot.users.cache.get(data.user_id);
    const channel = bot.channels.cache.get(data.channel_id);
    const message = await channel.messages.fetch(data.message_id);
    const member = message.guild.members.cache.get(user.id);
    const guild = bot.guilds.cache.get(message.guild.id);
    const ParentSync = process.env.TicketCategory;

    if(channel.id === process.env.SupportChannel){
        if(user.bot) return;

        if(event.t === "MESSAGE_REACTION_ADD"){
            if(data.emoji.name === process.env.CreateReaction){
                if(member.roles.cache.has(process.env.PremiumRole)){
                    if(!bot.channels.cache.find(x => x.name === `premium-${user.id}`)){
                        guild.channels.create(`premium-${user.id}`, {type: "text", parent: ParentSync})
                            .then(async channel => {
                                await channel.lockPermissions();
                                await channel.updateOverwrite(user.id, {"VIEW_CHANNEL": true})
                            }).then(() => {
                                const DeleteTicket = new Discord.MessageEmbed()
                                    .setColor(process.env.EmbedRed)
                                    .setTimestamp()
                                    .setThumbnail(user.displayAvatarURL({size: 4096, dynamic: true}))    
                                    .setTitle(`**Закрытие тикета**`)
                                    .setDescription(`Нажмите на ${process.env.DeleteReaction}, чтобы закрыть тикет!`)
                                    .setFooter(`Jeelanga поддержка`, guild.iconURL({size: 4096, dynamic: true}));
    
                                return bot.channels.cache.find(x => x.name === `premium-${user.id}`).send(DeleteTicket)
                                    .then(tcs => {
                                        tcs.react(process.env.DeleteReaction);
                                    });
                            });
                    }else{
                        bot.channels.cache.find(x => x.name === `premium-${user.id}`).send(`${user}, для открытия нового тикета Вам необходимо закрыть этот!`);
                    }
                }else{
                    if(!bot.channels.cache.find(x => x.name === `ticket-${user.id}`)){
                        guild.channels.create(`ticket-${user.id}`, {type: "text", parent: ParentSync})
                            .then(async channel => {
                                await channel.lockPermissions();
                                await channel.updateOverwrite(user.id, {"VIEW_CHANNEL": true})
                            }).then(() => {
                                const DeleteTicket = new Discord.MessageEmbed()
                                    .setColor(process.env.EmbedRed)
                                    .setTimestamp()
                                    .setThumbnail(user.displayAvatarURL({size: 4096, dynamic: true}))    
                                    .setTitle(`**Закрытие тикета**`)
                                    .setDescription(`Нажмите на ${process.env.DeleteReaction}, чтобы закрыть тикет!`)
                                    .setFooter(`Jeelanga поддержка`, guild.iconURL({size: 4096, dynamic: true}));
    
                                return bot.channels.cache.find(x => x.name === `ticket-${user.id}`).send(DeleteTicket)
                                    .then(tcs => {
                                        tcs.react(process.env.DeleteReaction);
                                    });
                            });
                    }else{
                        bot.channels.cache.find(x => x.name === `ticket-${user.id}`).send(`${user}, для открытия нового тикета Вам необходимо закрыть этот!`);
                    }
                }
            }
        }
    }

    if(event.t === "MESSAGE_REACTION_ADD"){
        if(member.roles.cache.has(process.env.PremiumRole)){
            if(channel.name === `premium-${user.id}`){
                if(data.emoji.name === process.env.DeleteReaction){
                    channel.delete();
                }
            }
        }else{
            if(channel.name === `ticket-${user.id}`){
                if(data.emoji.name === process.env.DeleteReaction){
                    channel.delete();
                }
            }
        }
    }
});
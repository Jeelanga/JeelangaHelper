bot.on("raw", async event => {
    if(!events.hasOwnProperty(event.t)) return;

    const { d: data } = event;
    const user = bot.users.cache.get(data.user_id);
    const channel = bot.channels.cache.get(data.channel_id);
    const message = await channel.messages.fetch(data.message_id);
    const member = message.guild.members.cache.get(user.id);
    const guild = bot.guilds.cache.get(message.guild.id);
    const ParentSync = process.env.TicketCategory;
    const DeleteTicket = new MessageEmbed()
        .setColor(process.env.EmbedRed)
        .setTimestamp()
        .setThumbnail(user.displayAvatarURL({size: 4096, dynamic: true}))    
        .setTitle(`**Закрытие тикета**`)
        .setDescription(`Нажмите на ${process.env.DeleteReaction}, чтобы закрыть тикет!`)
        .setFooter(`Jeelanga поддержка`, guild.iconURL({size: 4096, dynamic: true}));

    if (event.t !== "MESSAGE_REACTION_ADD" || user.bot) return;

    const hasPremiumRole = member.roles.cache.has(process.env.PremiumRole)
    const channelName = `${hasPremiumRole ? 'premium-' : 'ticket-'}${user.id}`

    if (channel.name === channelName && data.emoji.name === process.env.DeleteReaction){
        return channel.delete();
    }
    if (channel.id !== process.env.SupportChannel) return;
    if (data.emoji.name !== process.env.CreateReaction) return;

    const existedChannel = bot.channels.cache.find(x => x.name === channelName)
    if (existedChannel) {
        return await existedChannel.send(`${user}, для открытия нового тикета Вам необходимо закрыть этот!`);
    }
});
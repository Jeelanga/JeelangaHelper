import dotenv from "dotenv";
dotenv.config();

export const envConf = {
    Language: process.env.Language,
    Token: process.env.Token,
    EmbedGreen: process.env.EmbedGreen,
    EmbedRed: process.env.EmbedRed,
    AdminChannel: process.env.AdminChannel,
    WelcomeChannel: process.env.WelcomeChannel,
    RulesChannel: process.env.RulesChannel,
    SupportChannel: process.env.SupportChannel,
    OwnerID: process.env.OwnerID,
    PremiumRole: process.env.PremiumRole,
    TicketCategory: process.env.TicketCategory,
    CreateReaction: process.env.CreateReaction,
    DeleteReaction: process.env.DeleteReaction,
    ReactionUP: process.env.ReactionUP,
    ReactionDOWN: process.env.ReactionDOWN,
};

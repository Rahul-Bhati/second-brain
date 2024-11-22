import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const AddTweetToDB = mutation({
    args: {
        tweetId: v.string(), text: v.string(), userName: v.string(), screen_name: v.string(), profileUrl: v.string(), createdBy: v.string()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('tweetTable', {
            tweetId: args.tweetId,
            text: args.text,
            userName: args.userName,
            screen_name: args.screen_name,
            profileUrl: args.profileUrl,
            createdBy: args.createdBy
        })

        return "Inserted"
    }
});

export const getAllTweetByUser = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        const result = await ctx.db
            .query('tweetTable')
            .filter((q) => q.eq(q.field('createdBy'), args.email))
            .order('desc')
            .collect();
        // console.log(result);

        return result;
    }
})
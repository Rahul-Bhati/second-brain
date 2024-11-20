import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
    args: { splitText: v.any(), fileId: v.string(), apiKey: v.string() },
    handler: async (ctx, args) => {
        // console.log("Handler called with args:", args);

        try {
            await ConvexVectorStore.fromTexts(
                args.splitText,
                args.fileId,
                new GoogleGenerativeAIEmbeddings({
                    apiKey: args.apiKey,
                    model: "text-embedding-004", // 768 dimensions
                    taskType: TaskType.RETRIEVAL_DOCUMENT,
                    title: "Document title",
                }),
                { ctx }
            );
            // console.log("Vector store embedding complete");
        } catch (err) {
            console.error("Error in embedding process:", err);
        }

        return "embeded successfully";

    },
});

export const search = action({
    args: {
        query: v.string(),
        fileId: v.string(),
        apiKey: v.string()
    },
    handler: async (ctx, args) => {
        console.log("Handler called with args:", args);
        try {
            const vectorStore = new ConvexVectorStore(
                new GoogleGenerativeAIEmbeddings({
                    apiKey: args.apiKey,
                    model: "text-embedding-004", // 768 dimensions
                    taskType: TaskType.RETRIEVAL_DOCUMENT,
                    title: "Document title",
                }),
                { ctx }
            );

            const resultOne = await (await vectorStore.similaritySearch(args.query, 1)).filter(q => q.metadata.fileId == args.fileId);
            console.log(resultOne);

            return JSON.stringify(resultOne);
        } catch (err) {
            console.error("Error in embedding process:", err);
        }
    },
});
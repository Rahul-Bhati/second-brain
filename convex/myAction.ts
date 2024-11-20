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
                { fileId: args.fileId },
                new GoogleGenerativeAIEmbeddings({
                    apiKey: args.apiKey,
                    model: "text-embedding-004", // 768 dimensions
                    taskType: TaskType.RETRIEVAL_DOCUMENT,
                    title: "Document title",
                }),
                {
                    ctx,
                    // metadata: { fileId: args.fileId }, // Ensure fileId is stored properly
                }
            );

            console.log("Embedding complete with metadata:", { fileId: args.fileId });
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

            const resultOne = await (await vectorStore.similaritySearch(args.query, 1)).filter(q => q.metadata?.fileId == args.fileId);
            console.log(resultOne);

            return JSON.stringify(resultOne);

            // console.log("VectorStore initialized.");

            // // Perform similarity search
            // const results = await (await vectorStore.similaritySearch(args.query, 1)).filter((q) => {
            //     const storedFileId = Object.values(q.metadata || {}).join('');
            //     return storedFileId === args.fileId;
            // });
            // console.log("Raw similarity search results:", results);

            //  Validate Metadata in Search Results
            // results.forEach((doc, index) => {
            //     console.log(`Result ${index}:`, doc.metadata);
            // });

            // // Filter results by fileId
            // const filteredResults = results.filter((q) => {
            //     const storedFileId = Object.values(q.metadata || {}).join(''); // Reconstruct the fileId
            //     console.log("Stored fileId:", storedFileId, "Expected fileId:", args.fileId);
            //     return storedFileId === args.fileId;
            // });

            // console.log("Filtered results:", filteredResults);

            // return JSON.stringify(results);
        } catch (err) {
            console.error("Error in embedding process:", err);
        }
    },
});
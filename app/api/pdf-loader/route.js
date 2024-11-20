import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// const pdfUrl = "https://befitting-loris-773.convex.cloud/api/storage/baeb882b-65c7-4d77-bc18-cfc25ba51dfe";

export async function GET(req) {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const pdfUrl = searchParams.get("pdfUrl");

    // 1. load pdf file
    const res = await fetch(pdfUrl);
    const data = await res.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfContent = "";
    docs.forEach(doc => pdfContent += doc.pageContent);

    // 2. Text spliting (smaller chunks)

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });
    const texts = await textSplitter.splitText(pdfContent);

    // const output = await textSplitter.createDocuments([pdfContent]);

    // let splitContent = [];
    // output.forEach(content => splitContent.push(content.pageContent));

    return NextResponse.json({
        result: texts
    })
}
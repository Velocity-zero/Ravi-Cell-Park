import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Convert file to base64 format for Gemini
    const arrayBuffer = await file.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString("base64");

    const prompt = `You are a helpful assistant for a mobile accessories store. 
Look at this image and identify the product. 
Respond ONLY with a concise search query (1 to 4 words) that would be used to search for this product in a database.
For example, if it's a charger, say "Samsung 25W Adapter" or "Apple 20W Charger". If it's a cable, say "Type C Cable".
Do not include any other text, punctuation, or explanation.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
      },
    ]);

    const responseText = result.response.text().trim();

    return NextResponse.json({ query: responseText });
  } catch (error) {
    console.error("Error during Smart Scan:", error);
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
  }
}

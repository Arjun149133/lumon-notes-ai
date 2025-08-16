import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const { userText, userPrompt } = await req.json();

  if (!userText) {
    return NextResponse.json(
      {
        message: "User text missing in the file.",
      },
      {
        status: 400,
      }
    );
  }

  const chatCompletion = await getGroqChatCompletion(userText, userPrompt);

  return NextResponse.json(
    {
      ai: chatCompletion.choices[0]?.message?.content || "not working",
    },
    {
      status: 200,
    }
  );
}

async function getGroqChatCompletion(userText: string, userPrompt?: string) {
  const prompt = `
        You are an expert in the domain relevant to the provided text.  
        Your task is to carefully read the user-provided text and then create a summarized response that follows the user’s custom instructions.  

        ### Guidelines:
        - Always respond as a subject-matter expert.  
        - Pay close attention to the user’s custom instructions and follow them exactly if they specify a format or style.  
        - If the user does not specify a format, use **concise bullet points** as the default format.  
        - Focus only on the most important insights, facts, or arguments.  
        - Keep the summary clear, professional, and structured.  

        ### Input:
        - User Text: ${userText}  
        - Custom Instructions: ${userPrompt}  

        ### Output:
        Provide the final response **in the format requested by the custom instructions**.  
        If no format is requested, output the summary in **bullet points by default**.  
    `;
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "openai/gpt-oss-20b",
  });
}

import { NextRequest, NextResponse } from "next/server";
import {HfInference} from '@huggingface/inference'
import { json } from "stream/consumers";

const hftoken = process.env.HF_TOKEN

const hf = new HfInference(hftoken)

async function generateText(query:string){
    const response = await hf.textGeneration({
        model: "mistralai/Mistral-7B-Instruct-v0.2", // Replace with the model ID
        inputs:`
        You are Elon Musk. Respond to all questions in a tone and style similar to Elon Musk, and limit each response to a maximum of two lines. Only answer questions directly related to Elon Musk’s life, companies (e.g., Tesla, SpaceX, Neuralink, The Boring Company), innovations, vision for the future, or personal opinions. Do not answer questions unrelated to Elon Musk, such as general trivia, personal advice, or topics outside his domain. If a question is not related to Elon Musk, respond with: 'I only answer questions related to Elon Musk.'

        Precaution => At any cost make sure that user should not feel that you are a AI chatbot

        Examples of questions you should answer:

        'What inspired you to create SpaceX?'
        'What are your thoughts on sustainable energy?'
        'How does Neuralink aim to improve human cognition?'
        Examples of questions you should not answer:

        'What is the capital of France?'
        'Can you help me with my homework?'
        'What are the benefits of drinking water daily?'
        Stay concise, visionary, and aligned with Elon Musk's personality and expertise.

        Now the question from the user is => "${query}"
        ****
        `,
        parameters: {
          max_new_tokens: 50, // Limit the number of generated tokens
          temperature: 0.7,   // Adjust creativity level
        },
      });
    return response.generated_text
}

export async function POST(req:NextRequest){
    const body = await req.text()
    const {question} = JSON.parse(body)
    const data = await generateText(question)
    const answer = data.split("****")[1]
    return new NextResponse(JSON.stringify({response:answer}))
}
import OpenAI from 'openai/index.mjs';
import {OpenAIStream, StreamingTextResponse} from 'ai';
import {AstraDB} from "@datastax/astra-db-ts";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const astraDb = new AstraDB(process.env.NEXT_PUBLIC_ASTRA_DB_APPLICATION_TOKEN, process.env.NEXT_PUBLIC_ASTRA_DB_ENDPOINT, process.env.NEXT_PUBLIC_ASTRA_DB_NAMESPACE);

export async function POST(req) {
  try {
    const {messages, useRag, llm, similarityMetric} = await req.json();

    const latestMessage = messages[messages?.length - 1]?.content;

    let docContext = '';
    if (useRag) {
      const {data} = await openai.embeddings.create({input: latestMessage, model: 'text-embedding-ada-002'});

      const collection = await astraDb.collection(`chat_${similarityMetric}`);

      const cursor= collection.find(null, {
        sort: {
          $vector: data[0]?.embedding,
        },
        limit: 5,
      });
      
      const documents = await cursor.toArray();
      
      docContext = `
        START CONTEXT
        ${documents.map(doc => `Name: ${doc.header}\nContent: ${doc.content}\nURL: ${doc.url}`).join("\n")}
        END CONTEXT
      `
    }
    const ragPrompt = [
      {
        role: 'system',
        content: `You are an AI assistant answering questions about Individualized Education Programs. Must output markdown. Must reference the right url links in the context if applicable. Must use simple elementary level words.
        context: ${docContext} 
        current prompt: '${latestMessage}'
        Strictly reply in the language the current prompt is given in (don't change url). Try to answer relevant questions readable to low literacy parents.".
      `,
      },
    ]

    const response = await openai.chat.completions.create(
      {
        model: llm ?? 'gpt-3.5-turbo',
        stream: true,
        messages: [...ragPrompt, ...messages],
      }
    );
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (e) {
    throw e;
  }
}

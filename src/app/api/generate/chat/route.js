import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
    });

    return NextResponse.json({ message: completion.choices[0].message });


  } catch (error) {
    console.error("Chat error:", error);

    return NextResponse.json(
      { error: error.message || "Failed to process chat" },
      { status: 500 }
    );
  }
}





























// const { NextResponse } = require("next/server");

// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(request) {
//   try {
//     const { messages } = await request.json();



//     console.log('========================', messages)

//     if (!messages || !Array.isArray(messages)) {
//       return NextResponse.json(
//         { error: "Invalid messages format" },
//         { status: 400 }
//       );
//     }

//     //================================================
//     // OpenAI API call to generate a response based on the messages
//     // https://platform.openai.com/
//     //================================================

//     // sending api call to openai
//     const completiion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages,
//       temperature: 0.7,

//       //       (property) ResponseCreateParamsBase.temperature?: number
//       // What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top_p but not both.
//     });

//     return NextResponse.json({
//       message: completiion.choices[0].message,
//     });
//   } catch (error) {
//     console.error("Error in POST request:", error);
//     return NextResponse.json(
//       { error: "Failed to process request" },
//       { status: 500 }
//     );
//   }
// }

// /* 
//  in Next.js App Router API routes, the exported function names must be fixed and correspond to the HTTP method you want to handle.

// For example:

// export async function GET() { ... } for GET requests
// export async function POST() { ... } for POST requests
// export async function PUT() { ... } for PUT requests
// export async function DELETE() { ... } for DELETE requests */

// /* import { NextResponse } from 'next/server';

// export async function GET(request) {
//   // Fetch data from an external API
//   const res = await fetch('https://api.example.com/data');
//   const data = await res.json();

//   // Return the data using NextResponse
//   return NextResponse.json(data);
// } */

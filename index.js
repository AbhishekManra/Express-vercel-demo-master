import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';

const app = express();
const port = 9000;

app.use(express.json());

dotenv.config(); 

app.post("/", async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Get the prompt from the request body
    const { prompt } = req.body;
    console.log(prompt);

    // Check if the prompt is provided
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    // Send the response after all the operations have completed
    res.json({ message: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred in gemni code" });
  }
});

// app.get("/", async (req, res) => {
//   const genAI = new GoogleGenerativeAI(process.env.API_KEY);
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//   const prompt = "Write a story about a magic backpack in short.";
//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();

//   // Send the response after all the operations have completed
//   res.json({ message: text });
// });

app.listen(9000, () => {
  console.log(`Starting Server on Port ${port}`);
});
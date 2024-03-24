import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';

const app = express();
const port = 9000;

dotenv.config(); // Load environment variables from .env file

// Access your API key as an environment variable (see "Set up your API key" above)

// app.get("/myroute", async (req, res) => {
// });

app.get("/", async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  console.log("api loaded");
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = "Write a story about a magic backpack in short.";
  console.log("generated prompt");
  const result = await model.generateContent(prompt);
  console.log("input got prompt");
  const response = await result.response;
  console.log("Got response");
  const text = response.text();
  console.log(text);

  // Send the response after all the operations have completed
  res.json({ message: text });
});

app.listen(9000, () => {
  console.log(`Starting Server on Port ${port}`);
});
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';

const app = express();
const port = 9000;

dotenv.config(); // Load environment variables from .env file

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.get("/myroute", async (req, res) => {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = "Write a story about a magic backpack in short.";
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  res.json({ message: text });
});

app.use("/", (req, res) => {
  res.json({ message: "Express App" });
});

app.listen(9000, () => {
  console.log(`Starting Server on Port ${port}`);
});
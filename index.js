import express from "express";

const app = express();
const port = 9000;
app.use("/", (req, res) => {
  res.json({ message: "Hello From Express App" });
});
app.use("/myroute", (req, res) => {
  res.json({ message: "This is the vercel route" });
});

app.listen(9000, () => {
  console.log(`Starting Server on Port ${port}`);
});

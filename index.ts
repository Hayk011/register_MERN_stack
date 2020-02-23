import express, { Application, Response, Request, response } from "express";
const app: Application = express();

app.get("/", (req: Request , res: Response) => {
  res.send("helloo");
});

app.listen(5000, () => {
  console.log("Server is runing");
});

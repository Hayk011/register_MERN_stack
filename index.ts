import express, { Application, Response, Request } from "express";
const app: Application = express();
import mongoose from "mongoose";
import routRegistr from "./routs/registr/registr";
import cors from "cors";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routRegistr);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://hayk:3706884262@cluster0-be1lf.mongodb.net/test?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    app.listen(5000, () => {
      console.log("Server is runing");
    });
  } catch (err) {
    console.log(err);
  }
};
start();

app.get("/", (req: Request, res: Response) => {
  res.send("helloo");
});

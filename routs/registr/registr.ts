import { Router, Request, Response } from "express";
const routr = Router();
routr.post("/register", (req: Request, res: Response) => {
  console.log(req.body);
});
export default routr;

import {Router} from "express";
const route = Router();
route.post("/", (request, response) => {
    console.log(request.body);
});
export default  route;
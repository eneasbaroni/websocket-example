import { Router } from "express";

const templateRouter = Router();

templateRouter.get("/clientsA", (req, res) => {
    res.render("clientsA")
})

templateRouter.get("/clientsB", (req, res) => {
    res.render("clientsB")
})

export default templateRouter
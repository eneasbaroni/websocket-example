import { Router } from "express";
import ClientManager from "../container/client.manager.js";

const clientRouter = Router();

const clientManager = new ClientManager("src/data/clients.json");

clientRouter.get("/", async (req, res) => { 
    try {
        const clients = await clientManager.getClients();
        res.status(200).json(clients);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

clientRouter.post("/", async (req, res) => {
    
    const client = req.body;
    try {
        const clients = await clientManager.addClient(client);
        res.status(201).json(clients);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

clientRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const clients = await clientManager.deleteClient(id);
        res.status(200).json(clients);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export default clientRouter
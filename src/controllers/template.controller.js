import { Router } from "express";
import ClientManager from "../container/client.manager.js"; //solo para usar en clientC
import { io } from "../app.js";//solo para usar en clientC


const clientManager = new ClientManager("src/data/clients.json");
const templateRouter = Router();

templateRouter.get("/clientsA", (req, res) => {
    res.render("clientsA")
})

templateRouter.get("/clientsB", (req, res) => {
    res.render("clientsB")
})


//logica para CLientC
templateRouter.get("/clientsC", async (req, res) => { 
    try {
        const clients = await clientManager.getClients();
        res.render("clientsC", { clients }) //renderizamos la vista pasando el listado de clientes
    }
    catch (error) {
        console.error(error)
    }    
})

templateRouter.post("/clientsC", async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const client = {
        name,
        email
    }
    const clients = await clientManager.addClient(client);
    io.emit('newArrClients', clients) //enviamos un mensaje al usuario con el listado de clientes actualizado
    res.status(200).json(clients);
})

templateRouter.delete("/clientsC/:id", async (req, res) => {
    const id = req.params.id
    const clients = await clientManager.deleteClient(id);
    io.emit('newArrClients', clients) //enviamos un mensaje al usuario con el listado de clientes actualizado
    res.status(200).json(clients);
})


export default templateRouter
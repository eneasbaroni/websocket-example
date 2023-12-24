//import fs promises
import fs from 'fs/promises'


class ClientManager {

    constructor(path) {
        this.path = path        
    }

    async newID() {
        const clients = await this.getClients()
        const lastClient = clients[clients.length - 1]
        if (lastClient) {
            return lastClient.id + 1
        }
        return 1
    }


    async getClients() {
       try {
           const data = await fs.readFile(this.path, 'utf-8')
           if (!data) {
               return []
           }
           const clients = JSON.parse(data)
           return clients
       } 
       catch (error) {
           throw error
       }
    }

    async addClient(client) {
        if (!client.name || !client.email) {
            throw new Error('Name and email are required')
        }
    
        try {
            const clients = await this.getClients()
            client.id = await this.newID()
            clients.push(client)
            await fs.writeFile(this.path, JSON.stringify(clients))
            return clients
        } 
        catch (error) {
            throw error
        }
    }

    async deleteClient(id) {
        try {
            const clients = await this.getClients()
            const client = clients.find(client => client.id === Number(id))
            if (!client) {
                throw new Error('Client not found')
            }
            const newClients = clients.filter(client => client.id !== Number(id))
            await fs.writeFile(this.path, JSON.stringify(newClients))
            return newClients
        } 
        catch (error) {
            throw error
        }
    }
}

export default ClientManager
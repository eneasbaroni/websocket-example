import express from 'express'
import router from './router/index.js'
import handlebars from 'express-handlebars'
import { Server } from "socket.io";
import axios from 'axios'

const app = express()

app.use(express.json())
app.use(express.static(process.cwd() + '/src/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/src/views')
app.set('view engine', 'handlebars')

app.get('/', (req, res) => res.send('Hello word'))
app.use('/api', router)


const port = process.env.PORT || 3000

const httpServer = app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

const io = new Server(httpServer)

io.on('connection', (socket) => {

    //logica para clientsA
    socket.on('newUserA', (message) => {//al conectarse un usuario nuevo le enviamos los clientes
        console.log(message)
        //peticion axios, puede ser una peticion fetch o directamente llamar al metodo del clientManager
        axios.get('http://localhost:3000/api/clients')
        .then(response => {
            socket.emit('clients', response.data)
        })
    })

    socket.on('newClient', (client) => {//recibo el mensaje "newClient" con la informacion del nuevo cliente     
            
        //peticion axios, puede ser una peticion fetch o directamente llamar al metodo del clientManager
        axios.post('http://localhost:3000/api/clients', client)
        .then(response => {
            io.emit('clients', response.data)//enviamos mensaje al usuario con el listado de clientes actualizado
        })   
        .catch(error => {
            console.error(error)
        })

    })

    socket.on('deleteClient', (id) => { //llega el mensaje para eliminar un cliente, con la info del id
        //peticion axios, puede ser una peticion fetch o directamente llamar al metodo del clientManager
        axios.delete(`http://localhost:3000/api/clients/${id}`)
        .then(response => {
            io.emit('clients', response.data) //enviamos mensaje al usuario con el listado de clientes actualizado
        })
        .catch(error => {
            console.error(error)
        })
    })


    //logica para clientsB
    socket.on('newUserB', (message) => { //al conectarse un usuario nuevo le enviamos un mensaje para que cargue los clientes
        console.log(message)
        io.emit('updateClients')
    })
    
    socket.on('deletClient', () => {//recibo el mensaje "newClient" con la informacion del nuevo cliente
        io.emit('updateClients')
    })
    
    socket.on('newClient', () => {//recibo el mensaje "newClient" con la informacion del nuevo cliente
        io.emit('updateClients')
    })


})
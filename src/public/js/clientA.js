const socket = io()


socket.emit('newUserA', 'Nuevo usuarioA conectado')//envio un mensaje al servidor para notificar la conexión

const handleSubmit = (e) => {
    e.preventDefault()

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const client = {
        name,
        email
    }

    socket.emit('newClient', client) //enviamos un mensaje al servidor con la info del nuevo cliente

    //limpiamos los campos
    document.getElementById('name').value = ''
    document.getElementById('email').value = ''

}

socket.on('clients', (clients) => {

    //renderizamos los clientes
    const clientsContainer = document.getElementById('clientsContainer')

    clientsContainer.innerHTML = ''

    for (const client of clients) {
        const clientDiv = document.createElement('div')
        clientDiv.innerHTML = `
            <h3>${client.name}</h3>
            <p>${client.email}</p>
        `

        clientsContainer.appendChild(clientDiv)

        //se agrega un boton delete con la logica para eliminar al cliente, enviando un mensaje al servidor
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = 'Eliminar'
        deleteButton.onclick = () => {            
            socket.emit('deleteClient', client.id)
        }

        clientDiv.appendChild(deleteButton)
    }
})
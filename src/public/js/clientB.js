const socket = io()

socket.emit('newUserB', 'Nuevo usuarioB conectado')//envio un mensaje al servidor para notificar la conexión


//Función para obtener los clientes de la API
const updateClients = async () => {
    try {
       const response = await fetch('http://localhost:3000/api/clients')
       const data = await response.json()
       return data //retornamos el listado de clientes de la API
    }
    catch (error) {
        console.error(error)
    }
}

//Función para renderizar los clientes
const renderClients = async () => {
    let clients = await updateClients() //obtenemos los clientes
    
    if (!clients) {
        return
    }

    const clientsContainer = document.getElementById('clientsContainer')

    clientsContainer.innerHTML = ''

    for (const client of clients) {
        const clientDiv = document.createElement('div')
        clientDiv.innerHTML = `
            <h3>${client.name}</h3>
            <p>${client.email}</p>
        `

        clientsContainer.appendChild(clientDiv)

        //se agrega un boton delete con la logica para eliminar al cliente, haciendo la petición a la API
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = 'Eliminar'
        deleteButton.onclick = () => {            
            fetch(`http://localhost:3000/api/clients/${client.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                socket.emit('deletClient', data)
            })
            .catch(error => {
                console.error(error)
            })
        }

        clientDiv.appendChild(deleteButton)
    }
}

const handleSubmit = (e) => {
    e.preventDefault()
    //obtener los valores del formulario

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const client = {
        name,
        email
    }

    fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
    })
    .then(response => response.json())
    .then(data => {
        socket.emit('newClient', data)
    })
    .catch(error => {
        console.error(error)
    })
}

socket.on('updateClients', () => { //cada vez que desde el servidor reciba el mensaje 'updateClients' renderizamos los clientes
    renderClients()
})
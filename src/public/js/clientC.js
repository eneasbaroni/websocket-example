const socket = io()

socket.emit('newUserC', 'Nuevo usuarioC conectado')//envio un mensaje al servidor para notificar la conexión


//Función para renderizar los clientes
const renderClients = async (clients) => {
    
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
            fetch(`http://localhost:3000/api/template/clientsC/${client.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                return
            })
            .catch(error => {
                console.error(error)
            })
        }

        clientDiv.appendChild(deleteButton)
    }
}

//funcion para crear un cliente
const handleSubmit = (e) => {
    e.preventDefault()

    
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const client = {
        name,
        email
    }
    fetch('http://localhost:3000/api/template/clientsC', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
    })
    .then(response => response.json())
    .then(data => {
        return
    })

    //limpiamos los campos
    document.getElementById('name').value = ''
    document.getElementById('email').value = ''
}

const handleDelete = (e, id) => {
    e.preventDefault()

    fetch(`http://localhost:3000/api/template/clientsC/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }        
    })
    .then(response => response.json())
    .then(data => {
        return
    })
    
}

socket.on('newArrClients', (clients) => {
    renderClients(clients)    
})


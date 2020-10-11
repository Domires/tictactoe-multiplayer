const server = require('http').createServer()
const io = require('socket.io')(server)

let letra = ''

io.on('connection', socket => {
    console.log(io.engine.clientsCount)

    if (io.engine.clientsCount > 2) {
        socket.disconnect()
        console.log('Disconnected...')
        return
    }

    // socket.on('a', data => {
    //     console.log(data)
    // })
    // io.sockets.emit('b', { ok: true })
    // socket.emit('b', { ok: true })

    socket.on('letra', data => {
        !(letra === 'X') ? letra = 'X' : letra = 'O'
        io.sockets.emit('letra', { ...data, letra })
    })
})

server.listen({
    port: 3001,
    hostname: 'localhost'
})

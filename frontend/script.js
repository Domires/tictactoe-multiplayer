const socket = io('http://localhost:3001')

const tictactoe = document.querySelectorAll(".container > div")

function clean() {
    tictactoe.forEach(e => e.innerText = '')
}

function win(letra) {
    const win = document.querySelector(`.${letra}`)
    if (win.innerText) {
        win.innerText = parseInt(win.innerText) + 1
        clean()
    } else {
        win.innerText = 1
        clean()
    }
}

socket.on('l', l => console.log(l))

socket.on('letra', ({ local, letra }) => {
    document.querySelector(`.${local}`).innerText = letra
    check(letra)
})

function check(letra) {
    const c1l1 = document.querySelector(".c1l1").innerText
    const c2l1 = document.querySelector(".c2l1").innerText
    const c3l1 = document.querySelector(".c3l1").innerText
    const c1l2 = document.querySelector(".c1l2").innerText
    const c2l2 = document.querySelector(".c2l2").innerText
    const c3l2 = document.querySelector(".c3l2").innerText
    const c1l3 = document.querySelector(".c1l3").innerText
    const c2l3 = document.querySelector(".c2l3").innerText
    const c3l3 = document.querySelector(".c3l3").innerText

    if (c1l1 === letra && c2l1 === letra && c3l1 === letra) return win(letra)
    if (c1l2 === letra && c2l2 === letra && c3l2 === letra) return win(letra)
    if (c1l3 === letra && c2l3 === letra && c3l3 === letra) return win(letra)

    if (c1l1 === letra && c1l2 === letra && c1l3 === letra) return win(letra)
    if (c2l1 === letra && c2l2 === letra && c2l3 === letra) return win(letra)
    if (c3l1 === letra && c3l2 === letra && c3l3 === letra) return win(letra)

    if (c1l1 === letra && c2l2 === letra && c3l3 === letra) return win(letra)
    if (c3l1 === letra && c2l2 === letra && c1l3 === letra) return win(letra)
}

tictactoe.forEach(e => e.onclick = _ => {
    if (e.innerText) return

    socket.emit('letra', { local: e.className })
})
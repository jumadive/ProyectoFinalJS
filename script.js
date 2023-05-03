// VARIABLES GLOBALES
let login = document.getElementById("login")
let usuarioReg = document.getElementById("usuarioReg")
let passwordReg = document.getElementById("passwordReg")
let registrarse = document.getElementById("registrarse")
let usuario = document.getElementById("usuario")
let password = document.getElementById("password")
let iniciarSesion = document.getElementById("iniciarSesion")
let cerrarSesion = document.getElementById("cerrarSesion")
let buscador = document.getElementById("buscador")
let contenedorPeliculas = document.getElementById("contenedorPeliculas")
let bienvenido

// FETCH
fetch("./data.json")
    .then(resp => resp.json())
    .then(peliculas => {
    // BUSCADOR
    buscador.addEventListener("input", filtrarNombre)

    // TARJETAS
    renderizarTarjetas(peliculas)

    // FUNCIONES
    function renderizarTarjetas(arrayPeliculas) {
        contenedorPeliculas.innerHTML = ""
        arrayPeliculas.forEach(pelicula => {
            let tarjeta = document.createElement("div")
            tarjeta.innerHTML = `
            <img class="img" src="${pelicula.img}" alt="${pelicula.titulo}">
            <h2>${pelicula.titulo}</h2>
            <p>Año: ${pelicula.año}</p>
            <p>Duracion: ${pelicula.duracion}</p>
            <p>Direccion: ${pelicula.direccion}</p>
            <p>Genero: ${pelicula.genero}</p>
            `
            tarjeta.className = "tarjeta"
            contenedorPeliculas.append(tarjeta)
        });
    }

    function filtrarNombre(e) {
        let arrayFiltradoNombre = peliculas.filter(pelicula => pelicula.titulo.includes(buscador.value))
        renderizarTarjetas(arrayFiltradoNombre)
    }
})

// REGISTRO - INICIO/CIERRE DE SESION
registrarse.addEventListener("click", () => {
    registroInfo = { usuarioReg: usuarioReg.value, passwordReg: passwordReg.value }
    localStorage.setItem("registroInfo", JSON.stringify(registroInfo))  
})
iniciarSesion.addEventListener("click", () => {
    let registroInfo = JSON.parse(localStorage.getItem("registroInfo"))
    if (registroInfo.usuarioReg === usuario.value && registroInfo.passwordReg === password.value) {
        login.classList.add("ocultar")
        cerrarSesion.classList.remove("ocultar")
        bienvenido = document.createElement("h2")
        bienvenido.innerHTML = ` 
        Bienvenido ${usuario.value}!
        `
        usuarioLogueado.append(bienvenido)

    } else {
        alerta()
    }
})
cerrarSesion.addEventListener("click", () => {
    login.classList.remove("ocultar")
    cerrarSesion.classList.add("ocultar")
    bienvenido.remove()
})

function alerta() {
    Swal.fire({
        icon: 'error',
        text: 'Usuario/Contraseña Incorrecto'
    })
}
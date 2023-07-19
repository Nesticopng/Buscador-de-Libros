var libros = []

fetch('libros.json')
    .then(response => response.json())
    .then(data => {
        libros = data
        mostrarLibros()
    })

var searchInput = document.getElementById('search')
var categoriaInput = document.getElementById('searchCategoria')

searchInput.addEventListener('input', buscarLibros)
categoriaInput.addEventListener('input', buscarLibros)

function buscarLibros() {
    var searchText = searchInput.value.toLowerCase()
    var categoriaFilter = categoriaInput.value.toLowerCase()

    var resultados = libros.filter(function (libro){
        var nombre = libro.nombre.toLowerCase()
        var autor = libro.autor.toLowerCase()
        var categoria = libro.categoria.toLowerCase()

        var coincideNombre = nombre.includes(searchText)
        var coincideAutor = autor.includes(searchText)
        var coincideCategoria = categoria.includes(categoriaFilter)

        return (coincideNombre || coincideAutor) && coincideCategoria
    })

    mostrarLibros(resultados)
}

function mostrarLibros(librosMostrados) {
    var tablaLibros = document.getElementById('tablaLibros')
    tablaLibros.innerHTML = ''

    if (!librosMostrados) {
        librosMostrados = libros
    }

    for (var i = 0; i < librosMostrados.length; i++) {
        var libro = librosMostrados[i]

        var fila = '<tr>' +
        '<td>' + libro.isbn + '</td>' +
        '<td>' + libro.nombre + '</td>' +
        '<td>' + libro.autor + '</td>' +
        '<td>' + libro.edicion + '</td>' +
        '<td>' + libro.categoria + '</td>' +
        '</tr>'

        tablaLibros.innerHTML += fila
    }
}
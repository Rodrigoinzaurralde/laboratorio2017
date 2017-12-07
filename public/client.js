
$(function() {
  console.log('Ejecutando función inicial');
  
  $.get('/api/artista', function(artistas) {
    artistas.forEach(function(artista) {
      $('<li></li>').text(artista.nombre).appendTo('ul#artista');
    });
  });

  $('form-artista').submit(function(event) {
    event.preventDefault();
    var nombre = $('#nombre').val();
    var genero = $('#genero').val();
    var imagenes = $('#imagenes').val();
    var calificacion = $('#calificacion').val();
    var integrantes = $('#integrantes').val();
    var body = {nombre:nombre, genero:genero, imagenes:imagenes, calificacion:calificacion, integrantes:integrantes};
    console.log('Body',body);
    
    $.post('/api/Artista', body, function(data, textStatus) {
      console.log(data);
      console.log(textStatus);
      $('<li></li>').text(nombre).appendTo('ul#artista');
      $('nombre').val('');
      $('genero').val('');
      $('imagenes').val('');
      $('calificacion').val('');
      $('integrantes').val('');
      $('input').focus();
    });
  });
 
  $.get('/api/cancion', function(canciones) {
    canciones.forEach(function(cancion) {
      $('<li></li>').text(cancion.nombre).appendTo('ul#cancion');
    });
  });

  $.get('/api/disco', function(discos) {
    discos.forEach(function(disco) {
      $('<li></li>').text(disco.nombre).appendTo('ul#disco');
    });
  });

  $.get('/api/lista', function(listas) {
    listas.forEach(function(lista) {
      $('<li></li>').text(lista.nombre).appendTo('ul#lista');
    });
  }); 
});

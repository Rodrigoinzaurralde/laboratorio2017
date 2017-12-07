
$(function() {
  console.log('Ejecutando función inicial');
  
  $.get('/api/artista', function(artistas) {
    artistas.forEach(function(artista) {
      $('<li></li>').text(artista.nombre).appendTo('ul#artistas');
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

  /*$('form-conejo').submit(function(event) {
    event.preventDefault();
    var nombre = $('#nombre').val();
    var nacimiento = $('#nacimiento').val();
    var edad = $('#edad').val();
    var body = {nombre:nombre, nacimiento:nacimiento, edad:edad};
    console.log('Body',body);
    $.post('/api/conejos', body, function(data, textStatus) {
      console.log(data);
      console.log(textStatus);
      $('<li></li>').text(nombre).appendTo('ul#conejos');
      $('nombre').val('');
      $('nacimiento').val('');
      $('edad').val('');
      $('input').focus();
    });
  });*/

});

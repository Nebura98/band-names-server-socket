const BandList = require('./band-list');


class Sockets {

  constructor(io) {

    this.io = io;

    this.bandList = new BandList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {

      console.log('cliente conectado');

      //Emitir al cliente conectado, todas las bandas actuales

      socket.emit('current-bands', this.bandList.getBands());


      //Votar por la banda
      socket.on('votar-banda', (id) => {
        this.bandList.increaseVotes(id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      //Borrar una banda
      socket.on('borrar-banda', (id) => {
        this.bandList.removeBand(id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      //Cambiar nombre de una banda
      socket.on('cambiar-nombre-banda', ({ id, nombre }) => {
        this.bandList.changeBandName(id, nombre);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      //Agregar una nueva banda
      socket.on('nueva-banda', ({ nombre }) => {
        this.bandList.addBand(nombre);
        this.io.emit('current-bands', this.bandList.getBands());
      });






    });
  }


}


module.exports = Sockets;
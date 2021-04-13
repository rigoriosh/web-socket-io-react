const BandList = require("./band-list");


class Sockets{

    constructor(io){

        this.io = io;

        this.listaDeBandas = new BandList();

        this.socketsEvents();
    }

    socketsEvents(){
    
        // on connection
        this.io.on('connection', (clientSocket) => { 
            console.log('Dispositivo cliente conectado', clientSocket.id)
            // emitir al cliente conectado todas las banas actuales
            clientSocket.emit('bandas-actuales', this.listaDeBandas.getBandas());

            clientSocket.on('votarBanda', (id)=>{
                this.listaDeBandas.increaseVotes(id);
                this.io.emit('bandas-actuales', this.listaDeBandas.getBandas());// recordar que con this.io en ves de clientSocket, se envia a todos los dispositivos conectados
            })

            clientSocket.on('removerBanda', (id)=>{
                this.listaDeBandas.removeBanda(id);
                this.io.emit('bandas-actuales', this.listaDeBandas.getBandas());// recordar que con this.io en ves de clientSocket, se envia a todos los dispositivos conectados
            })

            clientSocket.on('changeNameBanda', ({id, newName})=>{
                this.listaDeBandas.changeNameBanda(id, newName);
                this.io.emit('bandas-actuales', this.listaDeBandas.getBandas());// recordar que con this.io en ves de clientSocket, se envia a todos los dispositivos conectados
            })
            
            clientSocket.on('addBanda', (newName)=>{
                this.listaDeBandas.addBanda(newName);
                this.io.emit('bandas-actuales', this.listaDeBandas.getBandas());// recordar que con this.io en ves de clientSocket, se envia a todos los dispositivos conectados
            })
            
         });


    }
}



module.exports = Sockets;
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
const { comprobatJWT } = require('../helpers/jwt');
const { io } = require('../index');



// Mensajes de Sockets
io.on('connection', (client) => {
    const [valido, uid] = comprobatJWT(client.handshake.headers['x-token'])
    if (!valido) { return client.disconnect(); }

    console.log(`Cliente autenticado ${uid}`);

    usuarioConectado(uid);

    //Ingresar a una sala especifica
    //Sala global
    client.join(uid);
    //Escuchar mensaje personal
    client.on('mensaje-personal', async (payload) => {
        //console.log(payload);
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });

    //client.to(uid).emit


    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });


});

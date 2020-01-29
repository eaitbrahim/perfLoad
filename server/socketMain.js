function socketMain(io, socket) {
    // console.log("A socket connected!", socket.id);
    socket.on('clientAuth', (key) => {
        if (key === '6677ytyty7677ghgd77793') {
            // valid nodeClient
            socket.join('clients');
        } else if (key === 'hghhg7878dfdfdfd232xcv') {
            // valid ui client has joined
            socket.join('ui');
        } else {
            // an invalid client has joined. Goodbye
            socket.disconnect(true);
        }
    })
    socket.on('perfData', (data) => {
        console.log(data);
    })
}

module.exports = socketMain;
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://EurekaDb:e6UpRnvbCsgwULSg@emaily-zhjxj.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
});

const Machine = require('./models/Machine');

function socketMain(io, socket) {
    let macA;
    // console.log("A socket connected!", socket.id);
    socket.on('clientAuth', key => {
        if (key === '6677ytyty7677ghgd77793') {
            // valid nodeClient
            socket.join('clients');
        } else if (key === 'hghhg7878dfdfdfd232xcv') {
            // valid ui client has joined
            socket.join('ui');
            console.log('A dashboard has just joined')
        } else {
            // an invalid client has joined. Goodbye
            socket.disconnect(true);
        }
    });

    // a machine is connected, check to see if it's new.
    // if it's add it.
    socket.on('initPerfData', async (data) => {
        macA = data.macA;
        const mongooseResponse = await checkAndAdd(data);
        console.log('mongooseResponse: ', mongooseResponse);
    });

    socket.on('perfData', data => {
        io.to('ui').emit('data', data);
    });
}

function checkAndAdd(data) {
    return new Promise((resolve, reject) => {
        Machine.findOne({
            macA: data.macA
        }, (err, doc) => {
            if (err) {
                throw err;
                reject(err);
            } else if (doc == null) {
                let newMachine = new Machine(data);
                newMachine.save();
                resolve('added');
            } else {
                resolve('found');
            }
        });
    });
}

module.exports = socketMain;
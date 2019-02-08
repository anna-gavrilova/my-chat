var http = require('http');
const host='127.0.0.1';
const port=process.env.PORT || "5000";
const app=require('./backend/app');

app.set("port",port);
const server=http.createServer(app);
const io=require('socket.io')();

io.on('connection',client=>{
    console.log("New client connected")

    client.on('message',data=>{
        io.sockets.in(data.room).emit('message', data);
    });

    client.on('enter',roomid=>{
        console.log(roomid)
        client.emit('entered','I just sent somthing back');
    });

    client.on('goOnline',data=>{
        client.join(data.room)
        console.log(data.user+" is active for chat "+data.room)
    })

})

io.listen(8000)
console.log('listening for sockets on port 8000')

server.listen(port,host,()=>{
    console.log(`Server is listening on port ${port}`)
})
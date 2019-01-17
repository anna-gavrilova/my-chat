var http = require('http');
const host='127.0.0.1';
const port=process.env.PORT || "5000";
const app=require('./backend/app');

app.set("port",port);
const server=http.createServer(app);
server.listen(port,host,()=>{
    console.log(`Server is listening on port ${port}`)
})
const express =   require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/', require('./routes/routes'));

//Server
app.set("port",8080);
app.listen(app.get("port"), ()=>{
    console.log(`Servidor corriendo en el puerto 8080`);
});

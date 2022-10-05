const express = require('express');
const bp = require('body-parser')

const routerProducts = require('./src/router/productsR.js');
const routerCarrito  = require('./src/router/cartsR.js');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use('/productos', routerProducts);
// app.use('/carrito', routerCarrito);

app.get('*', (req, res) => {
    return res.status(404).send({error: true, message:'Path not found'});    
});

const server = app.listen(PORT, ()=>{
    console.log(`Listening on port ${ PORT }`);
});

server.on( "Error", error => console.log(`Error while listening on port ${PORT}: ${error}`) );

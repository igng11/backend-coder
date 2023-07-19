import express from "express";
import handlebars, { engine } from "express-handlebars";
import path from 'path';
import { __dirname } from "./utils.js";

import { productsRouters } from "./routes/products.routes.js";
import { cartsRouters } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";

import  ProductManager  from "./dao/productManager.js";

import http from 'http';
import { Server } from 'socket.io';

const port = 8082;
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Escucha el evento 'newProduct' emitido desde el cliente
  socket.on('newProduct', (product) => {
    io.emit('updateProductList', product);
  });

  // Escucha el evento 'deleteProduct' emitido desde el cliente
  socket.on('deleteProduct', (productId) => {
    io.emit('updateProductList', productId);
  });
});

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

app.listen(port,()=>console.log (`Server listening on port ${port}`));

//routes
app.use("/api/products", productsRouters);
app.use("/api/carts", cartsRouters);

//configuracion de handlebars

app.engine('.hbs', engine({extname: '.hbs'}));//habilitar extension .hbs
app.set('view engine', '.hbs'); //establacer motor de pllantillas
app.set('views', path.join(__dirname, '/views')); //ruta de la carpeta de vistas


const productsFilePath = 'products.json';
const productService = new ProductManager(productsFilePath);


// Definir las rutas
app.get("/home", async (req, res) => {
  // console.log("RUTA: ", productsFilePath);
  try {
  const productos = await productService.getProducts();
  res.render("home", {productos: productos
  // Renderizar la vista "home.hbs" con los productos como datos
});
}
catch (error) {
res.render("error");
}
});

  app.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts"); // Renderizar la vista "realTimeProducts.hbs"
  });


  //routes
  app.use(viewsRouter);
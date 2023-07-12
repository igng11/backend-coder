import { Router } from "express";
import { CartsManager } from "../dao/cartsManager.js";
import { ProductManager } from "../dao/productManager.js";

const cartService = new CartsManager("carts.json");
const productService = new ProductManager("products.json");

const router = Router();

// Ruta raíz POST /api/carts/
// Crea un nuevo carrito
router.post("/", (req, res) => {
  const newCart = cartService.createCart();
  res.json({ status: "success", data: newCart });
});

// Ruta GET /api/carts/:cid
// Lista los productos que pertenecen al carrito con el cid proporcionado
router.get("/:cid", (req, res) => {
  const cartId = req.params.cid;
  const cart = cartService.getCartById(cartId);
  if (cart) {
    res.json({ status: "success", data: cart.products });
  } else {
    res.json({ status: "error", message: "Carrito no encontrado" });
  }
});

// Ruta POST /api/carts/:cid/product/:pid
// Agrega el producto al carrito seleccionado
router.post("/:cid/product/:pid", (req, res) => {
  const cartId = req.params.cid;
  const productId = parseInt(req.params.pid);
  const quantity = parseInt(req.body.quantity);
  
  const product = productService.getProductById(productId);
  if (!product) {
    res.json({ status: "error", message: "Producto no encontrado" });
    return;
  }

  const cart = cartService.getCartById(cartId);
  if (!cart) {
    res.json({ status: "error", message: "Carrito no encontrado" });
    return;
  }

  cartService.addProductToCart(cartId, product, quantity);
  res.json({ status: "success", message: "Producto agregado al carrito" });
});

export { router as cartsRouters };

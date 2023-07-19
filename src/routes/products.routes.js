import { Router } from "express";
import ProductManager from "../dao/productManager.js";

const productService = new ProductManager("products.json");

const router = Router();

// Ruta raíz GET /api/products/
// Lista todos los productos de la base
router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const products = await productService.getProducts(limit);
    res.json({ status: "RESPUESTA OBTENIDA", data: products });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Ruta GET /api/products/:pid
// Obtiene un producto por su ID
router.get("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productService.getProductById(productId);
  if (product) {
    res.json({ status: "success", data: product });
  } else {
    res.json({ status: "error", message: "Producto no encontrado" });
  }
});

// Ruta PUT /api/products/:pid
// Actualiza un producto por su ID
router.put("/:pid", (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedFields = req.body;
    const updatedProduct = productService.updateProduct(productId, updatedFields);
    if (updatedProduct) {
      res.json({ status: "success", data: updatedProduct });
    } else {
      res.json({ status: "error", message: "Producto no encontrado" });
    }
  });
  
// Ruta DELETE /api/products/:pid
// Elimina un producto por su ID
router.delete("/:pid", (req, res) => {
    const productId = parseInt(req.params.pid);
    const deletedProduct = productService.deleteProduct(productId);
    if (deletedProduct) {
      res.json({ status: "success", data: deletedProduct });
    } else {
      res.json({ status: "error", message: "Producto no encontrado" });
    }
  });

export { router as productsRouters }; //aca se exporta la ruta a app.js

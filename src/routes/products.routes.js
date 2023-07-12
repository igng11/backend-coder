import { Router } from "express";
import { ProductManager } from "../dao/productManager.js";

const productService = new ProductManager("products.json");

const validateFields = (req,res,next)=>{
    const productInfo = req.body;
    if(!productInfo.title || !productInfo.description || !productInfo.price){
        res.json({status:"error", message:"campos incompletos"})
    }else{
        next();
    }
}
const router = Router();

router.get("/",async (req,res)=>{
    try {
        const products = await productService.get();
        res.json({status:"succes", data:products});
    } catch (error) {
        res.json({status:"error", message: error.message})
    }
});

router.get("/:pid", (req,res)=>{});

router.post("/", validateFields, (req,res)=>{
    const productInfo = req.body;
    //agregar el producto
})
router.put("/pid",(req,res)=>{
    const productInfo = req.body;
    //actualizar el producto
})
router.delete("/:pid,",(req,res)=>{});

export {router as productsRouters};
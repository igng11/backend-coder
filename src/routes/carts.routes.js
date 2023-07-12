import { Router } from "express";
import { CartstManager } from "../dao/cartsManager.js";


const cartService = new CartstManager("carts.json");

const router = Router();

export {router as cartsRouters};
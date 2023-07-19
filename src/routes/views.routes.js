import { Router } from "express";

const router = Router();

router.get("/", (req,res)=>{
    res.render("homeroutes", "ignacio");
});

export {router as viewsRouter};

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
  });
  
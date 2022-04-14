const { Router } =require("express")
const {postProducto, getProducto}=require('../controllers/producto')
const router=Router()



router.get('/',getProducto)
router.post('/',postProducto)





module.exports= router
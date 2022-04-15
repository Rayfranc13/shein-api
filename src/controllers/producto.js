const axios=require('axios');
const res = require('express/lib/response');
const jsdom=require('jsdom')
const ProductoSchema=require('../models/producto')
const { JSDOM } = jsdom;



const getProducto=async(req,res)=>{
    const productos=await ProductoSchema.find()
    res.json({
        productos
    })
}


const postProducto=async(req,res)=>{
const {url,precio}=req.body

const productoData =await axios.get(url,{'proxy':{'host':'151.106.18.125','port':'1080'}})

const prodId=url.slice(url.indexOf('-p-'),url.indexOf('-cat-')).replace('-p-','')
console.log(prodId)
const data=productoData.data
 const doc=new JSDOM(data)

const pr=doc.window.document.getElementsByTagName('script')
let index=-1
const array=Array.prototype.slice.call( pr )
array.forEach((e,i)=>{
    if(e.text.includes('window.goodsDetailv2SsrData')){
index=i
}  
   })
 const result=array[index].text.slice(array[index].text.indexOf('productIntroData'),array[index].text.indexOf('ssrAbtKey'))
 const filtro1=result.slice(result.indexOf('"detail":'),result.length)
 const filtro2=filtro1.slice(filtro1.indexOf(`"goods_id":"${prodId}"`))
 const filtro3=filtro2.slice(0,filtro2.indexOf('"exclusivePromotionPrice"'))
const  jsonData=JSON.parse(('{'+filtro3+'}').replace("},}","}"))
const {goods_name:nombre,original_img,goods_desc:desc,productDetails:detalles_producto}=jsonData
 const img=[original_img.replace('//','')]
const producto =new ProductoSchema({nombre,desc,img,precio,detalles_producto})
 try{
     producto.save()
     res.json(producto)
 }catch(e){
     res.status(500).send()
 }
 
}

const deleteProducto=async(req,res)=>{
const {id:_id}=req.params
const producto=await ProductoSchema.findByIdAndDelete(_id)
if(producto){
    return res.json({
        msg:'El producto se ha eliminado',
        producto
    })
}
return res.json({
    msg:`El producto ${_id} no existe`
})
}

module.exports={
    getProducto,
    postProducto,
    deleteProducto,
}